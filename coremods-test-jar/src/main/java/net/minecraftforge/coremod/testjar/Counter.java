/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */

package net.minecraftforge.coremod.testjar;

import java.util.ArrayList;
import java.util.List;

public class Counter {
    private final List<Integer> counts = new ArrayList<>();

    public Counter() {
        push();
    }

    public int[] getCounts() {
        return counts.stream().mapToInt(Integer::intValue).toArray();
    }

    public void push() {
        counts.add(0);
    }

    public void increment() {
        counts.set(counts.size() - 1, counts.get(counts.size() - 1) + 1);
    }
}
