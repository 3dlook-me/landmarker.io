'use strict';

import * as Backbone from 'backbone';

const AtomicOperationTracker = Backbone.Model.extend({

    defaults: function () {
        return { ATOMIC_OPERATION: false };
    },

    _startAtomicOperation: function () {
        this.set('ATOMIC_OPERATION', true);
    },

    _endAtomicOperation: function () {
        this.set('ATOMIC_OPERATION', false);
    },

    atomicOperationUnderway: function () {
        return this.get('ATOMIC_OPERATION');
    },

    atomicOperationFinished: function () {
        return !this.get('ATOMIC_OPERATION');
    },

    atomicOperation: function (f) {
        // calls f ensuring that the atomic operation is set throughout.

        return function () {
            if (!atomicTracker.atomicOperationUnderway()) {
                // we are the highest level atomic lock. Code inside should be
                // called with a single atomic lock wrapped around it.

                // console.log('Starting atomic operation');
                atomicTracker._startAtomicOperation();
                f.apply(this, arguments);
                // console.log('Ending atomic operation');
                atomicTracker._endAtomicOperation();
            } else {
                // we are nested inside some other atomic lock. Just call the
                // function as normal.
                f.apply(this, arguments);
            }
        };
    }

});

const atomicTracker = new AtomicOperationTracker();
export const atomicOperation = f => atomicTracker.atomicOperation(f);
export const on = atomicTracker.on;
export const atomicOperationUnderway = () => atomicTracker.atomicOperationUnderway()
