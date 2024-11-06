/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
@Java2TS(
		name = "asm", declare = {
		@Type(value = org.objectweb.asm.tree.AbstractInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.FieldInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.FrameNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.IincInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.InsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.IntInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.InsnList.class, export = true),
		@Type(value = org.objectweb.asm.tree.InvokeDynamicInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.JumpInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.LabelNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.LdcInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.LineNumberNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.LocalVariableAnnotationNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.LocalVariableNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.LookupSwitchInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.MethodInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.MultiANewArrayInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.TableSwitchInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.TryCatchBlockNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.TypeAnnotationNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.TypeInsnNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.VarInsnNode.class, export = true),
		
		// Adding new fields to classes
		@Type(value = org.objectweb.asm.tree.FieldNode.class, export = true),
		
		// Adding new methods to classes
		@Type(value = org.objectweb.asm.tree.MethodNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.ClassNode.class, export = true),
		@Type(value = org.objectweb.asm.tree.ParameterNode.class, export = true),
		
		@Type(value = org.objectweb.asm.Attribute.class, export = true),
		@Type(value = org.objectweb.asm.Handle.class, export = true),
		@Type(value = org.objectweb.asm.Label.class, export = true),
		@Type(value = org.objectweb.asm.Type.class, export = true),
		@Type(value = org.objectweb.asm.TypePath.class, export = true),
		@Type(value = org.objectweb.asm.TypeReference.class, export = true),
		
		
		@Type(value = org.objectweb.asm.util.ASMifier.class, export = true),
		@Type(value = org.objectweb.asm.util.ASMifierSupport.class, export = true),
		@Type(value = org.objectweb.asm.util.CheckAnnotationAdapter.class, export = true),
		@Type(value = org.objectweb.asm.util.CheckClassAdapter.class, export = true),
		@Type(value = org.objectweb.asm.util.CheckFieldAdapter.class, export = true),
		@Type(value = org.objectweb.asm.util.CheckMethodAdapter.class, export = true),
		@Type(value = org.objectweb.asm.util.CheckModuleAdapter.class, export = true),
		@Type(value = org.objectweb.asm.util.CheckRecordComponentAdapter.class, export = true),
		@Type(value = org.objectweb.asm.util.CheckSignatureAdapter.class, export = true),
		@Type(value = org.objectweb.asm.util.Printer.class, export = true),
		@Type(value = org.objectweb.asm.util.Textifier.class, export = true),
		@Type(value = org.objectweb.asm.util.TextifierSupport.class, export = true),
		@Type(value = org.objectweb.asm.util.TraceAnnotationVisitor.class, export = true),
		@Type(value = org.objectweb.asm.util.TraceClassVisitor.class, export = true),
		@Type(value = org.objectweb.asm.util.TraceFieldVisitor.class, export = true),
		@Type(value = org.objectweb.asm.util.TraceMethodVisitor.class, export = true),
		@Type(value = org.objectweb.asm.util.TraceModuleVisitor.class, export = true),
		//		@Type(value=org.objectweb.asm.util.TraceRecordComponentVisitor.class, export=true),
		@Type(value = org.objectweb.asm.util.TraceSignatureVisitor.class, export = true),
}
)
package net.minecraftforge.coremod;

import org.bsc.processor.annotation.Java2TS;
import org.bsc.processor.annotation.Type;