/*
 * Project: java2typescript - https://github.com/bsorrentino/java2typescript
 *
 * Author: bsorrentino 
 *
 * TYPESCRIPT EXPORTED DECLARATIONS
 *
 */
/// <reference path="asm.d.ts"/>

interface ASMifierStatic {

	readonly class:any;
	new(  ):org.objectweb.asm.util.ASMifier;
	main( arg0:[string] ):void;
	appendString( arg0:any /*java.lang.StringBuilder*/, arg1:string ):void;
}

export const ASMifier: ASMifierStatic = Java.type("org.objectweb.asm.util.ASMifier");


interface ASMifierSupportStatic {

	readonly class:any;
}

export const ASMifierSupport: ASMifierSupportStatic = Java.type("org.objectweb.asm.util.ASMifierSupport");


interface AbstractInsnNodeStatic {

	readonly class:any;
}

export const AbstractInsnNode: AbstractInsnNodeStatic = Java.type("org.objectweb.asm.tree.AbstractInsnNode");


interface AttributeStatic {

	readonly class:any;
	write( arg0:org.objectweb.asm.Attribute, arg1:any /*org.objectweb.asm.ClassWriter*/, arg2:bytearray, arg3:int, arg4:int, arg5:int ):bytearray;
	read( arg0:org.objectweb.asm.Attribute, arg1:any /*org.objectweb.asm.ClassReader*/, arg2:int, arg3:int, arg4:chararray, arg5:int, arg6:[org.objectweb.asm.Label] ):org.objectweb.asm.Attribute;
	readLabel( arg0:any /*org.objectweb.asm.ClassReader*/, arg1:int, arg2:[org.objectweb.asm.Label] ):org.objectweb.asm.Label;
}

export const Attribute: AttributeStatic = Java.type("org.objectweb.asm.Attribute");


interface CheckAnnotationAdapterStatic {

	readonly class:any;
	new( arg0:any /*org.objectweb.asm.AnnotationVisitor*/ ):org.objectweb.asm.util.CheckAnnotationAdapter;
}

export const CheckAnnotationAdapter: CheckAnnotationAdapterStatic = Java.type("org.objectweb.asm.util.CheckAnnotationAdapter");


interface CheckClassAdapterStatic {

	readonly class:any;
	new( arg0:any /*org.objectweb.asm.ClassVisitor*/, arg1:boolean ):org.objectweb.asm.util.CheckClassAdapter;
	new( arg0:any /*org.objectweb.asm.ClassVisitor*/ ):org.objectweb.asm.util.CheckClassAdapter;
	checkClassSignature( arg0:string ):void;
	checkFieldSignature( arg0:string ):void;
	checkMethodSignature( arg0:string ):void;
	main( arg0:[string] ):void;
	verify( arg0:any /*org.objectweb.asm.ClassReader*/, arg1:boolean, arg2:any /*java.io.PrintWriter*/ ):void;
	verify( arg0:any /*org.objectweb.asm.ClassReader*/, arg1:any /*java.lang.ClassLoader*/, arg2:boolean, arg3:any /*java.io.PrintWriter*/ ):void;
}

export const CheckClassAdapter: CheckClassAdapterStatic = Java.type("org.objectweb.asm.util.CheckClassAdapter");


interface CheckFieldAdapterStatic {

	readonly class:any;
	new( arg0:any /*org.objectweb.asm.FieldVisitor*/ ):org.objectweb.asm.util.CheckFieldAdapter;
}

export const CheckFieldAdapter: CheckFieldAdapterStatic = Java.type("org.objectweb.asm.util.CheckFieldAdapter");


interface CheckMethodAdapterStatic {

	readonly class:any;
	new( arg0:int, arg1:string, arg2:string, arg3:any /*org.objectweb.asm.MethodVisitor*/, arg4:java.util.Map<org.objectweb.asm.Label, int|null> ):org.objectweb.asm.util.CheckMethodAdapter;
	new( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):org.objectweb.asm.util.CheckMethodAdapter;
	new( arg0:any /*org.objectweb.asm.MethodVisitor*/, arg1:java.util.Map<org.objectweb.asm.Label, int|null> ):org.objectweb.asm.util.CheckMethodAdapter;
}

export const CheckMethodAdapter: CheckMethodAdapterStatic = Java.type("org.objectweb.asm.util.CheckMethodAdapter");


interface CheckModuleAdapterStatic {

	readonly class:any;
	new( arg0:any /*org.objectweb.asm.ModuleVisitor*/, arg1:boolean ):org.objectweb.asm.util.CheckModuleAdapter;
}

export const CheckModuleAdapter: CheckModuleAdapterStatic = Java.type("org.objectweb.asm.util.CheckModuleAdapter");


interface CheckRecordComponentAdapterStatic {

	readonly class:any;
	new( arg0:any /*org.objectweb.asm.RecordComponentVisitor*/ ):org.objectweb.asm.util.CheckRecordComponentAdapter;
}

export const CheckRecordComponentAdapter: CheckRecordComponentAdapterStatic = Java.type("org.objectweb.asm.util.CheckRecordComponentAdapter");


interface CheckSignatureAdapterStatic {

	readonly class:any;
	new( arg0:int, arg1:any /*org.objectweb.asm.signature.SignatureVisitor*/ ):org.objectweb.asm.util.CheckSignatureAdapter;
}

export const CheckSignatureAdapter: CheckSignatureAdapterStatic = Java.type("org.objectweb.asm.util.CheckSignatureAdapter");


interface ClassNodeStatic {

	readonly class:any;
	new(  ):org.objectweb.asm.tree.ClassNode;
	new( arg0:int ):org.objectweb.asm.tree.ClassNode;
}

export const ClassNode: ClassNodeStatic = Java.type("org.objectweb.asm.tree.ClassNode");


interface CollectionsStatic {

	readonly class:any;
	checkedCollection<E>( arg0:java.util.Collection<E>, arg1:java.lang.Class<E> ):java.util.Collection<E>;
	checkedList<E>( arg0:java.util.List<E>, arg1:java.lang.Class<E> ):java.util.List<E>;
	checkedNavigableSet<E>( arg0:any /*java.util.NavigableSet*/, arg1:java.lang.Class<E> ):any /*java.util.NavigableSet*/;
	emptyNavigableSet(  ):any /*java.util.NavigableSet*/;
	checkedQueue<E>( arg0:any /*java.util.Queue*/, arg1:java.lang.Class<E> ):any /*java.util.Queue*/;
	checkedSet<E>( arg0:java.util.Set<E>, arg1:java.lang.Class<E> ):java.util.Set<E>;
	newSetFromMap<E>( arg0:java.util.Map<E, boolean|null> ):java.util.Set<E>;
	checkedSortedSet<E>( arg0:any /*java.util.SortedSet*/, arg1:java.lang.Class<E> ):any /*java.util.SortedSet*/;
	emptySortedSet(  ):any /*java.util.SortedSet*/;
	checkedMap<K,V>( arg0:java.util.Map<K, V>, arg1:java.lang.Class<K>, arg2:java.lang.Class<V> ):java.util.Map<K, V>;
	singletonMap<K,V>( arg0:K, arg1:V ):java.util.Map<K, V>;
	synchronizedMap<K,V>( arg0:java.util.Map<K, V> ):java.util.Map<K, V>;
	unmodifiableMap<K,V>( arg0:java.util.Map<K, V> ):java.util.Map<K, V>;
	checkedNavigableMap<K,V>( arg0:any /*java.util.NavigableMap*/, arg1:java.lang.Class<K>, arg2:java.lang.Class<V> ):any /*java.util.NavigableMap*/;
	synchronizedNavigableMap( arg0:any /*java.util.NavigableMap*/ ):any /*java.util.NavigableMap*/;
	unmodifiableNavigableMap( arg0:any /*java.util.NavigableMap*/ ):any /*java.util.NavigableMap*/;
	checkedSortedMap<K,V>( arg0:any /*java.util.SortedMap*/, arg1:java.lang.Class<K>, arg2:java.lang.Class<V> ):any /*java.util.SortedMap*/;
	synchronizedSortedMap( arg0:any /*java.util.SortedMap*/ ):any /*java.util.SortedMap*/;
	unmodifiableSortedMap( arg0:any /*java.util.SortedMap*/ ):any /*java.util.SortedMap*/;
	sort<T>( arg0:java.util.List<T> ):void;
	max<T>( arg0:java.util.Collection<T> ):T;
	min<T>( arg0:java.util.Collection<T> ):T;
	max<T>( arg0:java.util.Collection<T>, arg1:any /*java.util.Comparator*/ ):T;
	min<T>( arg0:java.util.Collection<T>, arg1:any /*java.util.Comparator*/ ):T;
	addAll<T>( arg0:java.util.Collection<T>, ...arg1:T[] ):boolean;
	replaceAll<T>( arg0:java.util.List<T>, arg1:T, arg2:T ):boolean;
	binarySearch<T>( arg0:java.util.List<T>, arg1:T, arg2:any /*java.util.Comparator*/ ):int;
	binarySearch<T>( arg0:java.util.List<java.lang.Comparable<T>>, arg1:T ):int;
	list( arg0:any /*java.util.Enumeration*/ ):any /*java.util.ArrayList*/;
	synchronizedCollection<T>( arg0:java.util.Collection<T> ):java.util.Collection<T>;
	unmodifiableCollection<T>( arg0:java.util.Collection<T> ):java.util.Collection<T>;
	reverseOrder(  ):any /*java.util.Comparator*/;
	reverseOrder( arg0:any /*java.util.Comparator*/ ):any /*java.util.Comparator*/;
	emptyEnumeration(  ):any /*java.util.Enumeration*/;
	enumeration<T>( arg0:java.util.Collection<T> ):any /*java.util.Enumeration*/;
	emptyIterator<T>(  ):java.util.Iterator<T>;
	nCopies<T>( arg0:int, arg1:T ):java.util.List<T>;
	singletonList<T>( arg0:T ):java.util.List<T>;
	synchronizedList<T>( arg0:java.util.List<T> ):java.util.List<T>;
	unmodifiableList<T>( arg0:java.util.List<T> ):java.util.List<T>;
	emptyListIterator(  ):any /*java.util.ListIterator*/;
	synchronizedNavigableSet( arg0:any /*java.util.NavigableSet*/ ):any /*java.util.NavigableSet*/;
	unmodifiableNavigableSet( arg0:any /*java.util.NavigableSet*/ ):any /*java.util.NavigableSet*/;
	asLifoQueue( arg0:any /*java.util.Deque*/ ):any /*java.util.Queue*/;
	singleton<T>( arg0:T ):java.util.Set<T>;
	synchronizedSet<T>( arg0:java.util.Set<T> ):java.util.Set<T>;
	unmodifiableSet<T>( arg0:java.util.Set<T> ):java.util.Set<T>;
	synchronizedSortedSet( arg0:any /*java.util.SortedSet*/ ):any /*java.util.SortedSet*/;
	unmodifiableSortedSet( arg0:any /*java.util.SortedSet*/ ):any /*java.util.SortedSet*/;
	copy<T>( arg0:java.util.List<T>, arg1:java.util.List<T> ):void;
	fill<T>( arg0:java.util.List<T>, arg1:T ):void;
	sort<T>( arg0:java.util.List<T>, arg1:any /*java.util.Comparator*/ ):void;
	disjoint( arg0:java.util.Collection<any /*java.lang.Object*/>, arg1:java.util.Collection<any /*java.lang.Object*/> ):boolean;
	emptyMap<K,V>(  ):java.util.Map<K, V>;
	emptyNavigableMap(  ):any /*java.util.NavigableMap*/;
	emptySortedMap(  ):any /*java.util.SortedMap*/;
	emptyList<T>(  ):java.util.List<T>;
	emptySet<T>(  ):java.util.Set<T>;
	frequency( arg0:java.util.Collection<any /*java.lang.Object*/>, arg1:any /*java.lang.Object*/ ):int;
	indexOfSubList( arg0:java.util.List<any /*java.lang.Object*/>, arg1:java.util.List<any /*java.lang.Object*/> ):int;
	lastIndexOfSubList( arg0:java.util.List<any /*java.lang.Object*/>, arg1:java.util.List<any /*java.lang.Object*/> ):int;
	reverse( arg0:java.util.List<any /*java.lang.Object*/> ):void;
	rotate( arg0:java.util.List<any /*java.lang.Object*/>, arg1:int ):void;
	shuffle( arg0:java.util.List<any /*java.lang.Object*/> ):void;
	shuffle( arg0:java.util.List<any /*java.lang.Object*/>, arg1:any /*java.util.Random*/ ):void;
	swap( arg0:java.util.List<any /*java.lang.Object*/>, arg1:int, arg2:int ):void;
}

export const Collections: CollectionsStatic = Java.type("java.util.Collections");


interface CollectorsStatic {

	readonly class:any;
	collectingAndThen<RR,R>( arg0:any /*java.util.stream.Collector*/, arg1:Func<R, RR> ):any /*java.util.stream.Collector*/;
	filtering<T>( arg0:Predicate<T>, arg1:any /*java.util.stream.Collector*/ ):any /*java.util.stream.Collector*/;
	toCollection<C>( arg0:Supplier<C> ):any /*java.util.stream.Collector*/;
	partitioningBy<T>( arg0:Predicate<T>, arg1:any /*java.util.stream.Collector*/ ):any /*java.util.stream.Collector*/;
	groupingByConcurrent<K,T,M>( arg0:Func<T, K>, arg1:Supplier<M>, arg2:any /*java.util.stream.Collector*/ ):any /*java.util.stream.Collector*/;
	groupingBy<K,T>( arg0:Func<T, K>, arg1:any /*java.util.stream.Collector*/ ):any /*java.util.stream.Collector*/;
	groupingByConcurrent<K,T>( arg0:Func<T, K>, arg1:any /*java.util.stream.Collector*/ ):any /*java.util.stream.Collector*/;
	groupingBy<K,T,M>( arg0:Func<T, K>, arg1:Supplier<M>, arg2:any /*java.util.stream.Collector*/ ):any /*java.util.stream.Collector*/;
	toMap<K,T,U,M>( arg0:Func<T, K>, arg1:Func<T, U>, arg2:BinaryOperator<U>, arg3:Supplier<M> ):any /*java.util.stream.Collector*/;
	toConcurrentMap<K,T,U,M>( arg0:Func<T, K>, arg1:Func<T, U>, arg2:BinaryOperator<U>, arg3:Supplier<M> ):any /*java.util.stream.Collector*/;
	toMap<K,T,U>( arg0:Func<T, K>, arg1:Func<T, U> ):any /*java.util.stream.Collector*/;
	toMap<K,T,U>( arg0:Func<T, K>, arg1:Func<T, U>, arg2:BinaryOperator<U> ):any /*java.util.stream.Collector*/;
	toUnmodifiableMap<K,T,U>( arg0:Func<T, K>, arg1:Func<T, U> ):any /*java.util.stream.Collector*/;
	toUnmodifiableMap<K,T,U>( arg0:Func<T, K>, arg1:Func<T, U>, arg2:BinaryOperator<U> ):any /*java.util.stream.Collector*/;
	toConcurrentMap<K,T,U>( arg0:Func<T, K>, arg1:Func<T, U> ):any /*java.util.stream.Collector*/;
	toConcurrentMap<K,T,U>( arg0:Func<T, K>, arg1:Func<T, U>, arg2:BinaryOperator<U> ):any /*java.util.stream.Collector*/;
	groupingBy<K,T>( arg0:Func<T, K> ):any /*java.util.stream.Collector*/;
	groupingByConcurrent<K,T>( arg0:Func<T, K> ):any /*java.util.stream.Collector*/;
	teeing<R2,R,R1>( arg0:any /*java.util.stream.Collector*/, arg1:any /*java.util.stream.Collector*/, arg2:BiFunction<R1, R2, R> ):any /*java.util.stream.Collector*/;
	flatMapping<T,U>( arg0:Func<T, java.util.stream.Stream<U>>, arg1:any /*java.util.stream.Collector*/ ):any /*java.util.stream.Collector*/;
	mapping<T,U>( arg0:Func<T, U>, arg1:any /*java.util.stream.Collector*/ ):any /*java.util.stream.Collector*/;
	reducing<T,U>( arg0:U, arg1:Func<T, U>, arg2:BinaryOperator<U> ):any /*java.util.stream.Collector*/;
	reducing<T>( arg0:T, arg1:BinaryOperator<T> ):any /*java.util.stream.Collector*/;
	averagingDouble( arg0:any /*java.util.function.ToDoubleFunction*/ ):any /*java.util.stream.Collector*/;
	averagingInt( arg0:any /*java.util.function.ToIntFunction*/ ):any /*java.util.stream.Collector*/;
	averagingLong( arg0:any /*java.util.function.ToLongFunction*/ ):any /*java.util.stream.Collector*/;
	summingDouble( arg0:any /*java.util.function.ToDoubleFunction*/ ):any /*java.util.stream.Collector*/;
	summingInt( arg0:any /*java.util.function.ToIntFunction*/ ):any /*java.util.stream.Collector*/;
	counting(  ):any /*java.util.stream.Collector*/;
	summingLong( arg0:any /*java.util.function.ToLongFunction*/ ):any /*java.util.stream.Collector*/;
	summarizingDouble( arg0:any /*java.util.function.ToDoubleFunction*/ ):any /*java.util.stream.Collector*/;
	summarizingInt( arg0:any /*java.util.function.ToIntFunction*/ ):any /*java.util.stream.Collector*/;
	toList(  ):any /*java.util.stream.Collector*/;
	toUnmodifiableList(  ):any /*java.util.stream.Collector*/;
	summarizingLong( arg0:any /*java.util.function.ToLongFunction*/ ):any /*java.util.stream.Collector*/;
	partitioningBy<T>( arg0:Predicate<T> ):any /*java.util.stream.Collector*/;
	maxBy( arg0:any /*java.util.Comparator*/ ):any /*java.util.stream.Collector*/;
	minBy( arg0:any /*java.util.Comparator*/ ):any /*java.util.stream.Collector*/;
	reducing<T>( arg0:BinaryOperator<T> ):any /*java.util.stream.Collector*/;
	toSet(  ):any /*java.util.stream.Collector*/;
	toUnmodifiableSet(  ):any /*java.util.stream.Collector*/;
	joining(  ):any /*java.util.stream.Collector*/;
	joining( arg0:any /*java.lang.CharSequence*/ ):any /*java.util.stream.Collector*/;
	joining( arg0:any /*java.lang.CharSequence*/, arg1:any /*java.lang.CharSequence*/, arg2:any /*java.lang.CharSequence*/ ):any /*java.util.stream.Collector*/;
}

export const Collectors: CollectorsStatic = Java.type("java.util.stream.Collectors");


interface FieldInsnNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:string, arg2:string, arg3:string ):org.objectweb.asm.tree.FieldInsnNode;
}

export const FieldInsnNode: FieldInsnNodeStatic = Java.type("org.objectweb.asm.tree.FieldInsnNode");


interface FieldNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:string, arg2:string, arg3:string, arg4:any /*java.lang.Object*/ ):org.objectweb.asm.tree.FieldNode;
	new( arg0:int, arg1:int, arg2:string, arg3:string, arg4:string, arg5:any /*java.lang.Object*/ ):org.objectweb.asm.tree.FieldNode;
}

export const FieldNode: FieldNodeStatic = Java.type("org.objectweb.asm.tree.FieldNode");


interface FrameNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:int, arg2:[any /*java.lang.Object*/], arg3:int, arg4:[any /*java.lang.Object*/] ):org.objectweb.asm.tree.FrameNode;
}

export const FrameNode: FrameNodeStatic = Java.type("org.objectweb.asm.tree.FrameNode");


interface HandleStatic {

	readonly class:any;
	new( arg0:int, arg1:string, arg2:string, arg3:string ):org.objectweb.asm.Handle;
	new( arg0:int, arg1:string, arg2:string, arg3:string, arg4:boolean ):org.objectweb.asm.Handle;
}

export const Handle: HandleStatic = Java.type("org.objectweb.asm.Handle");


interface IincInsnNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:int ):org.objectweb.asm.tree.IincInsnNode;
}

export const IincInsnNode: IincInsnNodeStatic = Java.type("org.objectweb.asm.tree.IincInsnNode");


interface InsnListStatic {

	readonly class:any;
	new(  ):org.objectweb.asm.tree.InsnList;
}

export const InsnList: InsnListStatic = Java.type("org.objectweb.asm.tree.InsnList");


interface InsnNodeStatic {

	readonly class:any;
	new( arg0:int ):org.objectweb.asm.tree.InsnNode;
}

export const InsnNode: InsnNodeStatic = Java.type("org.objectweb.asm.tree.InsnNode");


interface IntInsnNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:int ):org.objectweb.asm.tree.IntInsnNode;
}

export const IntInsnNode: IntInsnNodeStatic = Java.type("org.objectweb.asm.tree.IntInsnNode");


interface InvokeDynamicInsnNodeStatic {

	readonly class:any;
	new( arg0:string, arg1:string, arg2:org.objectweb.asm.Handle, ...arg3:any /*java.lang.Object*/[] ):org.objectweb.asm.tree.InvokeDynamicInsnNode;
}

export const InvokeDynamicInsnNode: InvokeDynamicInsnNodeStatic = Java.type("org.objectweb.asm.tree.InvokeDynamicInsnNode");


interface IterableStatic {

	readonly class:any;
	new<T>( arg0:java.lang.Iterable<T> ):java.lang.Iterable<T>;
}

export const Iterable: IterableStatic = Java.type("java.lang.Iterable");


interface JumpInsnNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:org.objectweb.asm.tree.LabelNode ):org.objectweb.asm.tree.JumpInsnNode;
}

export const JumpInsnNode: JumpInsnNodeStatic = Java.type("org.objectweb.asm.tree.JumpInsnNode");


interface LabelNodeStatic {

	readonly class:any;
	new(  ):org.objectweb.asm.tree.LabelNode;
	new( arg0:org.objectweb.asm.Label ):org.objectweb.asm.tree.LabelNode;
}

export const LabelNode: LabelNodeStatic = Java.type("org.objectweb.asm.tree.LabelNode");


interface LabelStatic {

	readonly class:any;
	new(  ):org.objectweb.asm.Label;
}

export const Label: LabelStatic = Java.type("org.objectweb.asm.Label");


interface LdcInsnNodeStatic {

	readonly class:any;
	new( arg0:any /*java.lang.Object*/ ):org.objectweb.asm.tree.LdcInsnNode;
}

export const LdcInsnNode: LdcInsnNodeStatic = Java.type("org.objectweb.asm.tree.LdcInsnNode");


interface LineNumberNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:org.objectweb.asm.tree.LabelNode ):org.objectweb.asm.tree.LineNumberNode;
}

export const LineNumberNode: LineNumberNodeStatic = Java.type("org.objectweb.asm.tree.LineNumberNode");


interface LocalVariableAnnotationNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:[org.objectweb.asm.tree.LabelNode], arg3:[org.objectweb.asm.tree.LabelNode], arg4:[int], arg5:string ):org.objectweb.asm.tree.LocalVariableAnnotationNode;
	new( arg0:int, arg1:int, arg2:org.objectweb.asm.TypePath, arg3:[org.objectweb.asm.tree.LabelNode], arg4:[org.objectweb.asm.tree.LabelNode], arg5:[int], arg6:string ):org.objectweb.asm.tree.LocalVariableAnnotationNode;
}

export const LocalVariableAnnotationNode: LocalVariableAnnotationNodeStatic = Java.type("org.objectweb.asm.tree.LocalVariableAnnotationNode");


interface LocalVariableNodeStatic {

	readonly class:any;
	new( arg0:string, arg1:string, arg2:string, arg3:org.objectweb.asm.tree.LabelNode, arg4:org.objectweb.asm.tree.LabelNode, arg5:int ):org.objectweb.asm.tree.LocalVariableNode;
}

export const LocalVariableNode: LocalVariableNodeStatic = Java.type("org.objectweb.asm.tree.LocalVariableNode");


interface LookupSwitchInsnNodeStatic {

	readonly class:any;
	new( arg0:org.objectweb.asm.tree.LabelNode, arg1:[int], arg2:[org.objectweb.asm.tree.LabelNode] ):org.objectweb.asm.tree.LookupSwitchInsnNode;
}

export const LookupSwitchInsnNode: LookupSwitchInsnNodeStatic = Java.type("org.objectweb.asm.tree.LookupSwitchInsnNode");


interface MethodInsnNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:string, arg2:string, arg3:string ):org.objectweb.asm.tree.MethodInsnNode;
	new( arg0:int, arg1:string, arg2:string, arg3:string, arg4:boolean ):org.objectweb.asm.tree.MethodInsnNode;
}

export const MethodInsnNode: MethodInsnNodeStatic = Java.type("org.objectweb.asm.tree.MethodInsnNode");


interface MethodNodeStatic {

	readonly class:any;
	new(  ):org.objectweb.asm.tree.MethodNode;
	new( arg0:int, arg1:int, arg2:string, arg3:string, arg4:string, arg5:[string] ):org.objectweb.asm.tree.MethodNode;
	new( arg0:int ):org.objectweb.asm.tree.MethodNode;
	new( arg0:int, arg1:string, arg2:string, arg3:string, arg4:[string] ):org.objectweb.asm.tree.MethodNode;
}

export const MethodNode: MethodNodeStatic = Java.type("org.objectweb.asm.tree.MethodNode");


interface MultiANewArrayInsnNodeStatic {

	readonly class:any;
	new( arg0:string, arg1:int ):org.objectweb.asm.tree.MultiANewArrayInsnNode;
}

export const MultiANewArrayInsnNode: MultiANewArrayInsnNodeStatic = Java.type("org.objectweb.asm.tree.MultiANewArrayInsnNode");


interface OptionalStatic {

	readonly class:any;
	empty<T>(  ):java.util.Optional<T>;
	of<T>( arg0:T ):java.util.Optional<T>;
	ofNullable<T>( arg0:T ):java.util.Optional<T>;
}

export const Optional: OptionalStatic = Java.type("java.util.Optional");


interface ParameterNodeStatic {

	readonly class:any;
	new( arg0:string, arg1:int ):org.objectweb.asm.tree.ParameterNode;
}

export const ParameterNode: ParameterNodeStatic = Java.type("org.objectweb.asm.tree.ParameterNode");


interface PrinterStatic {

	readonly class:any;
	appendString( arg0:any /*java.lang.StringBuilder*/, arg1:string ):void;
}

export const Printer: PrinterStatic = Java.type("org.objectweb.asm.util.Printer");


interface StreamStatic {

	readonly class:any;
	builder(  ):any /*java.util.stream.Stream$Builder*/;
	concat<T>( arg0:java.util.stream.Stream<T>, arg1:java.util.stream.Stream<T> ):java.util.stream.Stream<T>;
	empty<T>(  ):java.util.stream.Stream<T>;
	generate<T>( arg0:Supplier<T> ):java.util.stream.Stream<T>;
	iterate<T>( arg0:T, arg1:Predicate<T>, arg2:UnaryOperator<T> ):java.util.stream.Stream<T>;
	iterate<T>( arg0:T, arg1:UnaryOperator<T> ):java.util.stream.Stream<T>;
	of<T>( arg0:T ):java.util.stream.Stream<T>;
	of<T>( ...arg0:T[] ):java.util.stream.Stream<T>;
	ofNullable<T>( arg0:T ):java.util.stream.Stream<T>;
}

export const Stream: StreamStatic = Java.type("java.util.stream.Stream");


interface StringStatic {

	readonly class:any;
	new( arg0:any /*java.lang.StringBuffer*/ ):string;
	new( arg0:any /*java.lang.StringBuilder*/ ):string;
	new( arg0:bytearray, arg1:int, arg2:int, arg3:any /*java.nio.charset.Charset*/ ):string;
	new( arg0:bytearray, arg1:string ):string;
	new( arg0:bytearray, arg1:any /*java.nio.charset.Charset*/ ):string;
	new( arg0:bytearray, arg1:int, arg2:int ):string;
	new( arg0:bytearray ):string;
	new( arg0:chararray, arg1:int, arg2:int ):string;
	new( arg0:chararray ):string;
	new( arg0:string ):string;
	new(  ):string;
	new( arg0:bytearray, arg1:int, arg2:int, arg3:string ):string;
	new( arg0:bytearray, arg1:int ):string;
	new( arg0:bytearray, arg1:int, arg2:int, arg3:int ):string;
	new( arg0:[int], arg1:int, arg2:int ):string;
	copyValueOf( arg0:chararray ):string;
	copyValueOf( arg0:chararray, arg1:int, arg2:int ):string;
	format( arg0:string, ...arg1:any /*java.lang.Object*/[] ):string;
	format( arg0:any /*java.util.Locale*/, arg1:string, ...arg2:any /*java.lang.Object*/[] ):string;
	join( arg0:any /*java.lang.CharSequence*/, ...arg1:any /*java.lang.CharSequence*/[] ):string;
	join( arg0:any /*java.lang.CharSequence*/, arg1:java.lang.Iterable<any /*java.lang.CharSequence*/> ):string;
	valueOf( arg0:boolean ):string;
	valueOf( arg0:any /*char*/ ):string;
	valueOf( arg0:chararray ):string;
	valueOf( arg0:chararray, arg1:int, arg2:int ):string;
	valueOf( arg0:double ):string;
	valueOf( arg0:float ):string;
	valueOf( arg0:int ):string;
	valueOf( arg0:any /*java.lang.Object*/ ):string;
	valueOf( arg0:long ):string;
}

export const String: StringStatic = Java.type("java.lang.String");


interface TableSwitchInsnNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:int, arg2:org.objectweb.asm.tree.LabelNode, ...arg3:org.objectweb.asm.tree.LabelNode[] ):org.objectweb.asm.tree.TableSwitchInsnNode;
}

export const TableSwitchInsnNode: TableSwitchInsnNodeStatic = Java.type("org.objectweb.asm.tree.TableSwitchInsnNode");


interface TextifierStatic {

	readonly class:any;
	new(  ):org.objectweb.asm.util.Textifier;
	appendString( arg0:any /*java.lang.StringBuilder*/, arg1:string ):void;
	main( arg0:[string] ):void;
}

export const Textifier: TextifierStatic = Java.type("org.objectweb.asm.util.Textifier");


interface TextifierSupportStatic {

	readonly class:any;
}

export const TextifierSupport: TextifierSupportStatic = Java.type("org.objectweb.asm.util.TextifierSupport");


interface TraceAnnotationVisitorStatic {

	readonly class:any;
	new( arg0:org.objectweb.asm.util.Printer ):org.objectweb.asm.util.TraceAnnotationVisitor;
	new( arg0:any /*org.objectweb.asm.AnnotationVisitor*/, arg1:org.objectweb.asm.util.Printer ):org.objectweb.asm.util.TraceAnnotationVisitor;
}

export const TraceAnnotationVisitor: TraceAnnotationVisitorStatic = Java.type("org.objectweb.asm.util.TraceAnnotationVisitor");


interface TraceClassVisitorStatic {

	readonly class:any;
	new( arg0:any /*org.objectweb.asm.ClassVisitor*/, arg1:org.objectweb.asm.util.Printer, arg2:any /*java.io.PrintWriter*/ ):org.objectweb.asm.util.TraceClassVisitor;
	new( arg0:any /*org.objectweb.asm.ClassVisitor*/, arg1:any /*java.io.PrintWriter*/ ):org.objectweb.asm.util.TraceClassVisitor;
	new( arg0:any /*java.io.PrintWriter*/ ):org.objectweb.asm.util.TraceClassVisitor;
}

export const TraceClassVisitor: TraceClassVisitorStatic = Java.type("org.objectweb.asm.util.TraceClassVisitor");


interface TraceFieldVisitorStatic {

	readonly class:any;
	new( arg0:org.objectweb.asm.util.Printer ):org.objectweb.asm.util.TraceFieldVisitor;
	new( arg0:any /*org.objectweb.asm.FieldVisitor*/, arg1:org.objectweb.asm.util.Printer ):org.objectweb.asm.util.TraceFieldVisitor;
}

export const TraceFieldVisitor: TraceFieldVisitorStatic = Java.type("org.objectweb.asm.util.TraceFieldVisitor");


interface TraceMethodVisitorStatic {

	readonly class:any;
	new( arg0:org.objectweb.asm.util.Printer ):org.objectweb.asm.util.TraceMethodVisitor;
	new( arg0:any /*org.objectweb.asm.MethodVisitor*/, arg1:org.objectweb.asm.util.Printer ):org.objectweb.asm.util.TraceMethodVisitor;
}

export const TraceMethodVisitor: TraceMethodVisitorStatic = Java.type("org.objectweb.asm.util.TraceMethodVisitor");


interface TraceModuleVisitorStatic {

	readonly class:any;
	new( arg0:org.objectweb.asm.util.Printer ):org.objectweb.asm.util.TraceModuleVisitor;
	new( arg0:any /*org.objectweb.asm.ModuleVisitor*/, arg1:org.objectweb.asm.util.Printer ):org.objectweb.asm.util.TraceModuleVisitor;
}

export const TraceModuleVisitor: TraceModuleVisitorStatic = Java.type("org.objectweb.asm.util.TraceModuleVisitor");


interface TraceSignatureVisitorStatic {

	readonly class:any;
	new( arg0:int ):org.objectweb.asm.util.TraceSignatureVisitor;
}

export const TraceSignatureVisitor: TraceSignatureVisitorStatic = Java.type("org.objectweb.asm.util.TraceSignatureVisitor");


interface TryCatchBlockNodeStatic {

	readonly class:any;
	new( arg0:org.objectweb.asm.tree.LabelNode, arg1:org.objectweb.asm.tree.LabelNode, arg2:org.objectweb.asm.tree.LabelNode, arg3:string ):org.objectweb.asm.tree.TryCatchBlockNode;
}

export const TryCatchBlockNode: TryCatchBlockNodeStatic = Java.type("org.objectweb.asm.tree.TryCatchBlockNode");


interface TypeAnnotationNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string ):org.objectweb.asm.tree.TypeAnnotationNode;
	new( arg0:int, arg1:int, arg2:org.objectweb.asm.TypePath, arg3:string ):org.objectweb.asm.tree.TypeAnnotationNode;
}

export const TypeAnnotationNode: TypeAnnotationNodeStatic = Java.type("org.objectweb.asm.tree.TypeAnnotationNode");


interface TypeInsnNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:string ):org.objectweb.asm.tree.TypeInsnNode;
}

export const TypeInsnNode: TypeInsnNodeStatic = Java.type("org.objectweb.asm.tree.TypeInsnNode");


interface TypePathStatic {

	readonly class:any;
	fromString( arg0:string ):org.objectweb.asm.TypePath;
}

export const TypePath: TypePathStatic = Java.type("org.objectweb.asm.TypePath");


interface TypeReferenceStatic {

	readonly class:any;
	new( arg0:int ):org.objectweb.asm.TypeReference;
	newExceptionReference( arg0:int ):org.objectweb.asm.TypeReference;
	newFormalParameterReference( arg0:int ):org.objectweb.asm.TypeReference;
	newSuperTypeReference( arg0:int ):org.objectweb.asm.TypeReference;
	newTryCatchReference( arg0:int ):org.objectweb.asm.TypeReference;
	newTypeArgumentReference( arg0:int, arg1:int ):org.objectweb.asm.TypeReference;
	newTypeParameterBoundReference( arg0:int, arg1:int, arg2:int ):org.objectweb.asm.TypeReference;
	newTypeParameterReference( arg0:int, arg1:int ):org.objectweb.asm.TypeReference;
	newTypeReference( arg0:int ):org.objectweb.asm.TypeReference;
}

export const TypeReference: TypeReferenceStatic = Java.type("org.objectweb.asm.TypeReference");


interface TypeStatic {

	readonly class:any;
	getArgumentCount( arg0:string ):int;
	getArgumentsAndReturnSizes( arg0:string ):int;
	getConstructorDescriptor( arg0:any /*java.lang.reflect.Constructor*/ ):string;
	getDescriptor( arg0:java.lang.Class<any /*java.lang.Object*/> ):string;
	getInternalName( arg0:java.lang.Class<any /*java.lang.Object*/> ):string;
	getMethodDescriptor( arg0:any /*java.lang.reflect.Method*/ ):string;
	getMethodDescriptor( arg0:org.objectweb.asm.Type, ...arg1:org.objectweb.asm.Type[] ):string;
	getMethodType( arg0:string ):org.objectweb.asm.Type;
	getMethodType( arg0:org.objectweb.asm.Type, ...arg1:org.objectweb.asm.Type[] ):org.objectweb.asm.Type;
	getObjectType( arg0:string ):org.objectweb.asm.Type;
	getReturnType( arg0:string ):org.objectweb.asm.Type;
	getReturnType( arg0:any /*java.lang.reflect.Method*/ ):org.objectweb.asm.Type;
	getType( arg0:java.lang.Class<any /*java.lang.Object*/> ):org.objectweb.asm.Type;
	getType( arg0:string ):org.objectweb.asm.Type;
	getType( arg0:any /*java.lang.reflect.Constructor*/ ):org.objectweb.asm.Type;
	getType( arg0:any /*java.lang.reflect.Method*/ ):org.objectweb.asm.Type;
	getArgumentTypes( arg0:string ):[org.objectweb.asm.Type];
	getArgumentTypes( arg0:any /*java.lang.reflect.Method*/ ):[org.objectweb.asm.Type];
}

export const Type: TypeStatic = Java.type("org.objectweb.asm.Type");


interface VarInsnNodeStatic {

	readonly class:any;
	new( arg0:int, arg1:int ):org.objectweb.asm.tree.VarInsnNode;
}

export const VarInsnNode: VarInsnNodeStatic = Java.type("org.objectweb.asm.tree.VarInsnNode");


