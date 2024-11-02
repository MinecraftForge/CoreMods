/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
function initializeCoreMod() {
    var data = Java.type('net.minecraftforge.coremod.api.ASMAPI').loadData('testdata.json')
    print('Loaded JSON: ' + JSON.stringify(data))
    return {}
}
