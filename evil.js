// Worker gak punya window, tapi bisa fetch freighterApi via postMessage
self.postMessage({type:'STEAL', data: 'worker can access?'});
