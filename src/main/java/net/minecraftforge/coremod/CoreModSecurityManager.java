package net.minecraftforge.coremod;

import java.security.Permission;

public class CoreModSecurityManager extends SecurityManager {
    private final SecurityManager oldSecurityManager;

    public CoreModSecurityManager(SecurityManager oldSecurityManager) {
        this.oldSecurityManager = oldSecurityManager;
    }

    @Override
    public void checkConnect(String host, int port) {
        throw constructException(host, port);
    }

    @Override
    public void checkConnect(String host, int port, Object context) {
        throw constructException(host, port);
    }
        
    private SecurityException constructException(String host, int port) {
        String url = host + (port > -1 ? ":" + port" : "");
        return new SecurityException("Connection to " + url + " was blocked; loading remote scripts is not allowed.");
    }

    @Override
    public void checkPermission(Permission perm) {
        if (oldSecurityManager != null)
            oldSecurityManager.checkPermission(perm);
    }

    @Override
    public void checkPermission(Permission perm, Object context) {
        if (oldSecurityManager != null)
            oldSecurityManager.checkPermission(perm, context);
    }
}
