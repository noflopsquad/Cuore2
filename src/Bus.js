"use strict";

CUORE.Bus = (function(undefined) {

    var OFF = {
        log: function(payload){
        }
    };

    var ON = {
        log: function(payload){
            console.log(payload);
        }
    };

    var subscriptions = [];
    var debugMode = OFF;

    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        emit: emit,
        enableDebug: enableDebug
    };

    function subscribe (subscriber, eventName) {
        if (!_validSubscriber(subscriber)) {
            throw new Error("Not a subscriber (lacks eventDispatch function)");
        }

        if (!_subscriptionExists(subscriber, eventName)) {
            subscriptions.push(_createSubscription(subscriber, eventName));
        }
    }

    function unsubscribe(subscriber, events) {
        var i;

        if (typeof events == "string") {
            _removeSubscription(_createSubscription(subscriber, events));
            return;
        }

        for (i = 0; i < events.length; i++) {
            _removeSubscription(_createSubscription(subscriber, events[i]));
        }
    }

    function subscribers(theEvent) {
        var selectedSubscribers = [],
            i, subscription,
            len = subscriptions.length;

        for (i = 0; i < len; i++) {
            subscription = subscriptions[i];
            if (subscription.eventName === theEvent) {
                selectedSubscribers.push(subscription.subscriber);
            }
        }
        return selectedSubscribers;
    }

    function emit(eventName, params) {
        var subscribersList = subscribers(eventName),
            i, len = subscribersList.length;

       logEvent(eventName, params);

        for (i = 0; i < len; i++) {
            subscribersList[i].eventDispatch(eventName, params);
        }
    }

    function logEvent (name, params) {
        debug("Bus.emit (event, params)");
        debug(name);
        debug(params);
        debug("------------");
    }

    function debug(object) {
        debugMode.log(object);
    }

    function enableDebug() {
        debugMode = ON;
    }

    function _subscriptionExists(subscriber, eventName) {
        var i, len = subscriptions.length,
            theSubscription = _createSubscription(subscriber, eventName);

        for (i = 0; i < len; i++) {
            if (theSubscription.equals(subscriptions[i])) {
                return true;
            }
        }
        return false;
    }

    function _removeSubscription(theSubscription) {
        var i, len = subscriptions.length;

        for (i = 0; i < len; i++) {
            if (theSubscription.equals(subscriptions[i])) {
                subscriptions.splice(i, 1);
                return;
            }
        }
    }

    function _validSubscriber(subscriber) {
        return subscriber.eventDispatch;
    }

    function _createSubscription(subscriber, eventName) {
        return {
            subscriber: subscriber,
            eventName: eventName,
            equals: function(otherSubscription) {
                var sameSubscriber = (this.subscriber === otherSubscription.subscriber),
                    sameEvent = (this.eventName === otherSubscription.eventName);

                return (sameSubscriber && sameEvent);
            }
        };
    }
})();