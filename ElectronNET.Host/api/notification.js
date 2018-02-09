"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var notifications = [];
module.exports = function (socket) {
    socket.on('createNotification', function (options) {
        var notification = new electron_1.Notification(options);
        var haveEvent = false;
        if (options.showID) {
            haveEvent = true;
            notification.on('show', function () {
                global.elesocket.emit('NotificationEventShow', options.showID);
            });
        }
        if (options.clickID) {
            haveEvent = true;
            notification.on('click', function () {
                global.elesocket.emit('NotificationEventClick', options.clickID);
            });
        }
        if (options.closeID) {
            haveEvent = true;
            notification.on('close', function () {
                global.elesocket.emit('NotificationEventClose', options.closeID);
            });
        }
        if (options.replyID) {
            haveEvent = true;
            notification.on('reply', function (event, value) {
                global.elesocket.emit('NotificationEventReply', [options.replyID, value]);
            });
        }
        if (options.actionID) {
            haveEvent = true;
            notification.on('action', function (event, value) {
                global.elesocket.emit('NotificationEventAction', [options.actionID, value]);
            });
        }
        if (haveEvent) {
            notifications.push(notification);
        }
        notification.show();
    });
    socket.on('notificationIsSupported', function (options) {
        var isSupported = electron_1.Notification.isSupported;
        global.elesocket.emit('notificationIsSupportedComplete', isSupported);
    });
};
//# sourceMappingURL=notification.js.map