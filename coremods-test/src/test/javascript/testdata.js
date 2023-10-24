function initializeCoreMod() {
    var data = Java.type('net.minecraftforge.coremod.api.ASMAPI').loadData('testdata.json')
    print('Loaded JSON: ' + JSON.stringify(data))
    return {}
}
