/*!
 * angular-extended-notifications v1.0.4 - 2014-08-15
 * (c) 2014 L.systems SARL, Etienne Folio, Quentin Raynaud
 * https://bitbucket.org/lsystems/angular-extended-notifications
 * License: MIT
 */
angular.module('angular-extended-notifications', []).
provider('notifications', function() {
  'use strict';

  // notifications.info(title, message, data);
  // notifications.info(title, message, {faIcon: 'fa-heart'});
  // notifications.info(data);

  // notifications.error(…);
  // notifications.success(…);
  // notifications.warning(…);
  // notifications.notify(data);

  // Possible data options:
  // ---------------------
  //
  // data = {
  //   actions: [{
  //     label: string
  //     fn: function
  //   }]
  //   closeButton: bool
  //   title: title of the message
  //   message: message
  //   webkitNotifications: {
  //     iconFile: icon file
  //     notificationUrl: url to load as a webkit notification base (replaces default behavior)
  //   }
  //   attachTo: angular/jquery element or function
  //   className: className to apply on the template's root element
  //   duration: int in ms
  //   faIcon: font-awesome faIcon classname (fa-info for example)
  //   template: filename without extension
  //   templateFile: filename
  //   templatesDir: path
  //   show: function
  //   close: function
  // }

  var faIcons = {
    info: 'fa-info',
    error: 'fa-exclamation-circle',
    success: 'fa-check',
    warning: 'fa-exclamation-triangle'
  };

  this.setFaIcons = function(map) {
    for (var i in map)
      faIcons[i] = map[i];
    return this;
  };

  var defaults = {
    attachTo: 'body',
    className: '',
    duration: 3500,
    webkitNotifications: false,
    close: angular.noop,
    show: angular.noop,
    closeButton: true,
    templateFile: 'global-notification.html',
    templatesDir: 'templates/'
  };

  this.setDefaults = function(def) {
    for (var i in def)
      defaults[i] = def[i];
    return this;
  };

  this.$get = ['$timeout', '$templateCache', '$http', '$rootScope', '$compile', '$q',
  function($timeout, $templateCache, $http, $rootScope, $compile, $q) {
    var queue = [];

    function notify(data) {
      var notif;

      // complete data with default values
      for (var i in defaults)
        if (data[i] === undefined)
          data[i] = defaults[i];

      if (data.template)
        data.templateFile = data.template + '.html';

      var wkn = window.webkitNotifications;

      // message & title may be promises, let's resolve them
      var promise = $q
        .all([
          $q.when(data.message),
          $q.when(data.title)
        ])
        .then(function(d) {
          data.message = d[0];
          data.title = d[1];

          // webkitNotifications mode
          if (data.webkitNotifications && wkn && !wkn.checkPermission()) {
            if (typeof data.webkitNotifications !== 'object')
              throw new Error('data.webkitNotifications should either be false or an object');

            if (data.webkitNotifications.notificationUrl)
              // TODO: add data object as url params (use url module from node)
              notif = wkn.createHTMLNotification(data.webkitNotifications.notificationUrl);
            else
              notif = wkn.createNotification(
                data.webkitNotifications.iconFile,
                data.title,
                data.content
              );

            notif.ondisplay = data.show;
            notif.close = data.close;
            notif.show();
            return notif;
          }
        });

      // wait until promises are resolved for webkitNotifications
      if (data.webkitNotifications && wkn && !wkn.checkPermission())
        return promise;

      notif = {
        data: data,
        close: function() {
          // remove timeout in case of user action
          if (this.$timeoutPromise)
            $timeout.cancel(this.$timeoutPromise);

          // user callback
          if (data.close() === false)
            return;

          // remove from queue
          queue.splice(queue.indexOf(this), 1);

          // remove from DOM
          this.templateElement.remove();
        }
      };

      // retrieve template file
      $http
        .get(data.templatesDir + data.templateFile, {cache: $templateCache})
        .success(function(template) {
          // create scope & copy data elements in it
          var scope = $rootScope.$new(true);
          scope.close = notif.close.bind(notif);
          scope.data = data;

          // compile template element
          notif.templateElement = $compile(template)(scope);

          // add className
          notif.templateElement.addClass(data.className);

          // get element from string
          if (typeof data.attachTo === 'string')
            data.attachTo = angular.element(document.querySelector(data.attachTo));

          // attach it on the DOM
          if (typeof data.attachTo === 'object' && data.attachTo.prepend)
            data.attachTo.prepend(notif.templateElement);
          else if (typeof data.attachTo === 'function')
            data.attachTo(notif.templateElement);
          else
            throw new Error('Invalid value for attachTo. It should be either a function ' +
              'or an object with a prepend method');

          // add it to the notifications queue
          queue.push(notif);

          if (data.closeOnRouteChange) {
            if (!angular.isString(data.closeOnRouteChange))
              throw new Error('Invalid property closeOnRouteChange. ' +
                'Should be a string, like "route" to match an event like "routeChangeStart"');

            var removeListener = $rootScope.$on('$' + data.closeOnRouteChange + 'ChangeStart', function() {
              notif.close();
              removeListener();
            });
          }

          // start the timer
          if (~data.duration)
            notif.$timeoutPromise = $timeout(notif.close.bind(notif), data.duration);

          // user callback
          data.show();
        })
        .error(function(data) {
          throw new Error('Template specified for notifications (' + data.template + ') could not be loaded. ' + data);
        });

      return notif;
    }

    function notifyByType(type) {
      return function(title, message, data) {
        data = data || {};

        if (typeof title === 'object')
          data = title;
        else {
          data.title = title;
          data.message = message;
        }
        data.type = type;

        // set type fa-icon
        if (data.faIcons && (type in faIcons))
          data.faIcon = faIcons[type];

        return notify(data);
      };
    }

    return {
      queue: queue,

      info: notifyByType('info'),
      error: notifyByType('error'),
      success: notifyByType('success'),
      warning: notifyByType('warning'),
      notify: notify
    };
  }];
});
