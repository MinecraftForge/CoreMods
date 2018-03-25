var core2fn = function() {
    print("Core2 function!");
}
function initializeCoreMod() {
    print("Core2!");
    return {
        'coremodtwo': {
            'target': {
                'type': 'CLASS',
                'names': function(listofclasses) { return [ 'cpw.mods.testtarget.Test2', 'cpw.mods.testtarget.Test3' ] }
            },
            'transformer': function(classNode) {
                print("Cheese", classNode);
                return classNode;
            }
        }
    }
}