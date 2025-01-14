/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.test;

import net.minecraftforge.forgespi.coremod.ICoreModFile;

import java.io.IOException;
import java.io.Reader;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

class JSFileLoader implements ICoreModFile {
    private final Path path;

    JSFileLoader(final String path) {
        this.path = getPathFromResource(path);
    }

    @Override
    public Reader readCoreMod() {
        try {
            return Files.newBufferedReader(this.path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Path getPath() {
        return this.path;
    }

    @Override
    public Reader getAdditionalFile(final String fileName) throws IOException {
        return Files.newBufferedReader(this.path.getParent().resolve(fileName));
    }

    @Override
    public String getOwnerId() {
        return "dummy";
    }

    protected static Path getPathFromResource(String resource) {
        var cl = JSFileLoader.class.getClassLoader();
        var url = cl.getResource(resource);
        if (url == null)
            throw new IllegalStateException("Could not find " + resource + " in classloader " + cl);

        try {
            return Paths.get(url.toURI());
        } catch (URISyntaxException e) {
            return sneak(e);
        }
    }

    @SuppressWarnings("unchecked")
    private static <E extends Throwable, R> R sneak(Throwable e) throws E {
        throw (E)e;
    }
}
