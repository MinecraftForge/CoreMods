/*
 * Project: java2typescript - https://github.com/bsorrentino/java2typescript
 *
 * Author: bsorrentino 
 *
 * TYPESCRIPT DEFINITIONS
 *
 */

type int    = number;
type long   = number;
type float	= number;
type double = number;
type byte   = number;
type char   = string;

type chararray = [byte];
type bytearray = [char];

declare namespace java.lang {

	interface Class<T> {}
	interface AutoCloseable {}
	interface Cloneable {}

	type Object = any;
}

declare namespace java.util {

	interface RandomAccess {}
}

declare namespace java.io {

	interface Closeable {}
	interface Serializable {}
}

//
// Nashorn compatibility
//

declare function print( ...args: any[] ):void

declare function load( module:string ):void

declare namespace Java {

  export function type<T>( t:string):T;

  export function from<T>( list:java.util.List<T> ):Array<T> ;
  
}

//
// Generated declarations
//

declare namespace java.lang {

class String/* extends Object implements java.io.Serializable, Comparable<any>, CharSequence, java.lang.constant.Constable, java.lang.constant.ConstantDesc*/ {

	charAt( arg0:int ):any /*char*/;
	chars(  ):any /*java.util.stream.IntStream*/;
	codePointAt( arg0:int ):int;
	codePointBefore( arg0:int ):int;
	codePointCount( arg0:int, arg1:int ):int;
	codePoints(  ):any /*java.util.stream.IntStream*/;
	compareTo( arg0:string ):int;
	compareToIgnoreCase( arg0:string ):int;
	concat( arg0:string ):string;
	contains( arg0:any /*java.lang.CharSequence*/ ):boolean;
	contentEquals( arg0:any /*java.lang.CharSequence*/ ):boolean;
	contentEquals( arg0:any /*java.lang.StringBuffer*/ ):boolean;
	describeConstable(  ):java.util.Optional<string>;
	endsWith( arg0:string ):boolean;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	equalsIgnoreCase( arg0:string ):boolean;
	formatted( ...arg0:any /*java.lang.Object*/[] ):string;
	getBytes(  ):bytearray;
	getBytes( arg0:any /*java.nio.charset.Charset*/ ):bytearray;
	getBytes( arg0:int, arg1:int, arg2:bytearray, arg3:int ):void;
	getBytes( arg0:string ):bytearray;
	getChars( arg0:int, arg1:int, arg2:chararray, arg3:int ):void;
	indent( arg0:int ):string;
	indexOf( arg0:int ):int;
	indexOf( arg0:int, arg1:int ):int;
	indexOf( arg0:string ):int;
	indexOf( arg0:string, arg1:int ):int;
	intern(  ):string;
	isBlank(  ):boolean;
	isEmpty(  ):boolean;
	lastIndexOf( arg0:int ):int;
	lastIndexOf( arg0:int, arg1:int ):int;
	lastIndexOf( arg0:string ):int;
	lastIndexOf( arg0:string, arg1:int ):int;
	length(  ):int;
	lines(  ):java.util.stream.Stream<string>;
	matches( arg0:string ):boolean;
	offsetByCodePoints( arg0:int, arg1:int ):int;
	regionMatches( arg0:boolean, arg1:int, arg2:string, arg3:int, arg4:int ):boolean;
	regionMatches( arg0:int, arg1:string, arg2:int, arg3:int ):boolean;
	repeat( arg0:int ):string;
	replace( arg0:any /*char*/, arg1:any /*char*/ ):string;
	replace( arg0:any /*java.lang.CharSequence*/, arg1:any /*java.lang.CharSequence*/ ):string;
	replaceAll( arg0:string, arg1:string ):string;
	replaceFirst( arg0:string, arg1:string ):string;
	resolveConstantDesc( arg0:any /*java.lang.invoke.MethodHandles$Lookup*/ ):string;
	split( arg0:string ):[string];
	split( arg0:string, arg1:int ):[string];
	startsWith( arg0:string ):boolean;
	startsWith( arg0:string, arg1:int ):boolean;
	strip(  ):string;
	stripIndent(  ):string;
	stripLeading(  ):string;
	stripTrailing(  ):string;
	subSequence( arg0:int, arg1:int ):any /*java.lang.CharSequence*/;
	substring( arg0:int ):string;
	substring( arg0:int, arg1:int ):string;
	toCharArray(  ):chararray;
	toLowerCase(  ):string;
	toLowerCase( arg0:any /*java.util.Locale*/ ):string;
	toString(  ):string;
	toUpperCase(  ):string;
	toUpperCase( arg0:any /*java.util.Locale*/ ):string;
	transform<R>( arg0:Func<string, R> ):R;
	translateEscapes(  ):string;
	trim(  ):string;

} // end String

} // end namespace java.lang
declare namespace java.lang {

interface Comparable<T> {

	compareTo( arg0:T ):int;

} // end Comparable

} // end namespace java.lang
declare namespace java.lang {

interface Iterable<T> {

	(  ):java.util.Iterator<T>;
	forEach?( arg0:Consumer<T> ):void;
	spliterator?(  ):any /*java.util.Spliterator*/;

} // end Iterable

} // end namespace java.lang
declare namespace java.lang {

interface Runnable {

	(  ):void;

} // end Runnable

} // end namespace java.lang
declare namespace java.util {

class Collections/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	toString(  ):string;

} // end Collections

} // end namespace java.util
declare namespace java.util {

class Optional<T>/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	filter( arg0:Predicate<T> ):Optional<T>;
	flatMap<U>( arg0:Func<T, Optional<U>> ):Optional<U>;
	get(  ):T;
	ifPresent( arg0:Consumer<T> ):void;
	ifPresentOrElse( arg0:Consumer<T>, arg1:java.lang.Runnable ):void;
	isEmpty(  ):boolean;
	isPresent(  ):boolean;
	map<U>( arg0:Func<T, U> ):Optional<U>;
	or( arg0:Supplier<Optional<T>> ):Optional<T>;
	orElse( arg0:T ):T;
	orElseGet( arg0:Supplier<T> ):T;
	orElseThrow(  ):T;
	orElseThrow<X>( arg0:Supplier<X> ):T;
	stream(  ):java.util.stream.Stream<T>;
	toString(  ):string;

} // end Optional

} // end namespace java.util
declare namespace java.util {

interface Collection<E>/* extends java.lang.Iterable<E>*/ {

	add( arg0:E ):boolean;
	addAll( arg0:Collection<E> ):boolean;
	clear(  ):void;
	contains( arg0:any /*java.lang.Object*/ ):boolean;
	containsAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	forEach<T>( arg0:Consumer<T> ):void;
	isEmpty(  ):boolean;
	iterator(  ):Iterator<E>;
	parallelStream(  ):java.util.stream.Stream<E>;
	remove( arg0:any /*java.lang.Object*/ ):boolean;
	removeAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	removeIf( arg0:Predicate<E> ):boolean;
	retainAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	size(  ):int;
	spliterator(  ):any /*java.util.Spliterator*/;
	stream(  ):java.util.stream.Stream<E>;
	toArray(  ):[any /*java.lang.Object*/];
	toArray<T>( arg0:[T] ):[T];
	toArray<T>( arg0:any /*java.util.function.IntFunction*/ ):[T];

} // end Collection

} // end namespace java.util
declare namespace java.util {

interface Iterator<E> {

	forEachRemaining( arg0:Consumer<E> ):void;
	hasNext(  ):boolean;
	next(  ):E;
	remove(  ):void;

} // end Iterator

} // end namespace java.util
declare namespace java.util {

interface List<E>/* extends Collection<E>*/ {

	// static copyOf<E>( arg0:Collection<E> ):List<E>;
	// static of<E>(  ):List<E>;
	// static of<E>( ...arg0:E[] ):List<E>;
	// static of<E>( arg0:E ):List<E>;
	// static of<E>( arg0:E, arg1:E ):List<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E ):List<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E ):List<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E ):List<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E ):List<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E ):List<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E ):List<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E ):List<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E, arg9:E ):List<E>;
	add( arg0:E ):boolean;
	add( arg0:int, arg1:E ):void;
	addAll( arg0:Collection<E> ):boolean;
	addAll( arg0:int, arg1:Collection<E> ):boolean;
	clear(  ):void;
	contains( arg0:any /*java.lang.Object*/ ):boolean;
	containsAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	forEach<T>( arg0:Consumer<T> ):void;
	get( arg0:int ):E;
	indexOf( arg0:any /*java.lang.Object*/ ):int;
	isEmpty(  ):boolean;
	iterator(  ):Iterator<E>;
	lastIndexOf( arg0:any /*java.lang.Object*/ ):int;
	listIterator(  ):any /*java.util.ListIterator*/;
	listIterator( arg0:int ):any /*java.util.ListIterator*/;
	parallelStream(  ):java.util.stream.Stream<E>;
	remove( arg0:any /*java.lang.Object*/ ):boolean;
	remove( arg0:int ):E;
	removeAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	removeIf( arg0:Predicate<E> ):boolean;
	replaceAll( arg0:UnaryOperator<E> ):void;
	retainAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	set( arg0:int, arg1:E ):E;
	size(  ):int;
	sort( arg0:any /*java.util.Comparator*/ ):void;
	spliterator(  ):any /*java.util.Spliterator*/;
	stream(  ):java.util.stream.Stream<E>;
	subList( arg0:int, arg1:int ):List<E>;
	toArray(  ):[any /*java.lang.Object*/];
	toArray<T>( arg0:[T] ):[T];
	toArray<T>( arg0:any /*java.util.function.IntFunction*/ ):[T];

} // end List

} // end namespace java.util
declare namespace java.util {

interface Map<K, V> {

	// static copyOf<K,V>( arg0:Map<K, V> ):Map<K, V>;
	// static entry<K,V>( arg0:K, arg1:V ):any /*java.util.Map$Entry*/;
	// static of<K,V>(  ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V, arg4:K, arg5:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V, arg4:K, arg5:V, arg6:K, arg7:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V, arg4:K, arg5:V, arg6:K, arg7:V, arg8:K, arg9:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V, arg4:K, arg5:V, arg6:K, arg7:V, arg8:K, arg9:V, arg10:K, arg11:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V, arg4:K, arg5:V, arg6:K, arg7:V, arg8:K, arg9:V, arg10:K, arg11:V, arg12:K, arg13:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V, arg4:K, arg5:V, arg6:K, arg7:V, arg8:K, arg9:V, arg10:K, arg11:V, arg12:K, arg13:V, arg14:K, arg15:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V, arg4:K, arg5:V, arg6:K, arg7:V, arg8:K, arg9:V, arg10:K, arg11:V, arg12:K, arg13:V, arg14:K, arg15:V, arg16:K, arg17:V ):Map<K, V>;
	// static of<K,V>( arg0:K, arg1:V, arg2:K, arg3:V, arg4:K, arg5:V, arg6:K, arg7:V, arg8:K, arg9:V, arg10:K, arg11:V, arg12:K, arg13:V, arg14:K, arg15:V, arg16:K, arg17:V, arg18:K, arg19:V ):Map<K, V>;
	// static ofEntries<K,V>( ...arg0:any /*java.util.Map$Entry*/[] ):Map<K, V>;
	clear(  ):void;
	compute( arg0:K, arg1:BiFunction<K, V, V> ):V;
	computeIfAbsent( arg0:K, arg1:Func<K, V> ):V;
	computeIfPresent( arg0:K, arg1:BiFunction<K, V, V> ):V;
	containsKey( arg0:any /*java.lang.Object*/ ):boolean;
	containsValue( arg0:any /*java.lang.Object*/ ):boolean;
	entrySet(  ):Set<any /*java.util.Map$Entry*/>;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	forEach( arg0:BiConsumer<K, V> ):void;
	get( arg0:any /*java.lang.Object*/ ):V;
	getOrDefault( arg0:any /*java.lang.Object*/, arg1:V ):V;
	isEmpty(  ):boolean;
	keySet(  ):Set<K>;
	merge( arg0:K, arg1:V, arg2:BiFunction<V, V, V> ):V;
	put( arg0:K, arg1:V ):V;
	putAll( arg0:Map<K, V> ):void;
	putIfAbsent( arg0:K, arg1:V ):V;
	remove( arg0:any /*java.lang.Object*/ ):V;
	remove( arg0:any /*java.lang.Object*/, arg1:any /*java.lang.Object*/ ):boolean;
	replace( arg0:K, arg1:V ):V;
	replace( arg0:K, arg1:V, arg2:V ):boolean;
	replaceAll( arg0:BiFunction<K, V, V> ):void;
	size(  ):int;
	values(  ):Collection<V>;

} // end Map

} // end namespace java.util
declare namespace java.util {

interface Set<E>/* extends Collection<E>*/ {

	// static copyOf<E>( arg0:Collection<E> ):Set<E>;
	// static of<E>(  ):Set<E>;
	// static of<E>( ...arg0:E[] ):Set<E>;
	// static of<E>( arg0:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E ):Set<E>;
	// static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E, arg9:E ):Set<E>;
	add( arg0:E ):boolean;
	addAll( arg0:Collection<E> ):boolean;
	clear(  ):void;
	contains( arg0:any /*java.lang.Object*/ ):boolean;
	containsAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	forEach<T>( arg0:Consumer<T> ):void;
	isEmpty(  ):boolean;
	iterator(  ):Iterator<E>;
	parallelStream(  ):java.util.stream.Stream<E>;
	remove( arg0:any /*java.lang.Object*/ ):boolean;
	removeAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	removeIf( arg0:Predicate<E> ):boolean;
	retainAll( arg0:Collection<any /*java.lang.Object*/> ):boolean;
	size(  ):int;
	spliterator(  ):any /*java.util.Spliterator*/;
	stream(  ):java.util.stream.Stream<E>;
	toArray(  ):[any /*java.lang.Object*/];
	toArray<T>( arg0:[T] ):[T];
	toArray<T>( arg0:any /*java.util.function.IntFunction*/ ):[T];

} // end Set

} // end namespace java.util
declare namespace java.util.stream {

class Collectors/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	toString(  ):string;

} // end Collectors

} // end namespace java.util.stream
declare namespace java.util.stream {

interface Stream<T>/* extends BaseStream<T, any>*/ {

	allMatch( arg0:Predicate<T> ):boolean;
	anyMatch( arg0:Predicate<T> ):boolean;
	close(  ):void;
	collect<R>( arg0:Supplier<R>, arg1:BiConsumer<R, T>, arg2:BiConsumer<R, R> ):R;
	collect<R>( arg0:any /*java.util.stream.Collector*/ ):R;
	count(  ):long;
	distinct(  ):Stream<T>;
	dropWhile( arg0:Predicate<T> ):Stream<T>;
	filter( arg0:Predicate<T> ):Stream<T>;
	findAny(  ):java.util.Optional<T>;
	findFirst(  ):java.util.Optional<T>;
	flatMap<R>( arg0:Func<T, Stream<R>> ):Stream<R>;
	flatMapToDouble( arg0:Func<T, any /*java.util.stream.DoubleStream*/> ):any /*java.util.stream.DoubleStream*/;
	flatMapToInt( arg0:Func<T, any /*java.util.stream.IntStream*/> ):any /*java.util.stream.IntStream*/;
	flatMapToLong( arg0:Func<T, any /*java.util.stream.LongStream*/> ):any /*java.util.stream.LongStream*/;
	forEach( arg0:Consumer<T> ):void;
	forEachOrdered( arg0:Consumer<T> ):void;
	isParallel(  ):boolean;
	iterator(  ):java.util.Iterator<T>;
	limit( arg0:long ):Stream<T>;
	map<R>( arg0:Func<T, R> ):Stream<R>;
	mapMulti<R>( arg0:BiConsumer<T, Consumer<R>> ):Stream<R>;
	mapMultiToDouble( arg0:BiConsumer<T, any /*java.util.function.DoubleConsumer*/> ):any /*java.util.stream.DoubleStream*/;
	mapMultiToInt( arg0:BiConsumer<T, any /*java.util.function.IntConsumer*/> ):any /*java.util.stream.IntStream*/;
	mapMultiToLong( arg0:BiConsumer<T, any /*java.util.function.LongConsumer*/> ):any /*java.util.stream.LongStream*/;
	mapToDouble( arg0:any /*java.util.function.ToDoubleFunction*/ ):any /*java.util.stream.DoubleStream*/;
	mapToInt( arg0:any /*java.util.function.ToIntFunction*/ ):any /*java.util.stream.IntStream*/;
	mapToLong( arg0:any /*java.util.function.ToLongFunction*/ ):any /*java.util.stream.LongStream*/;
	max( arg0:any /*java.util.Comparator*/ ):java.util.Optional<T>;
	min( arg0:any /*java.util.Comparator*/ ):java.util.Optional<T>;
	noneMatch( arg0:Predicate<T> ):boolean;
	onClose<S>( arg0:java.lang.Runnable ):S;
	parallel<S>(  ):S;
	peek( arg0:Consumer<T> ):Stream<T>;
	reduce( arg0:BinaryOperator<T> ):java.util.Optional<T>;
	reduce( arg0:T, arg1:BinaryOperator<T> ):T;
	reduce<U>( arg0:U, arg1:BiFunction<U, T, U>, arg2:BinaryOperator<U> ):U;
	sequential<S>(  ):S;
	skip( arg0:long ):Stream<T>;
	sorted(  ):Stream<T>;
	sorted( arg0:any /*java.util.Comparator*/ ):Stream<T>;
	spliterator(  ):any /*java.util.Spliterator*/;
	takeWhile( arg0:Predicate<T> ):Stream<T>;
	toArray(  ):[any /*java.lang.Object*/];
	toArray<A>( arg0:any /*java.util.function.IntFunction*/ ):[A];
	toList(  ):java.util.List<T>;
	unordered<S>(  ):S;

} // end Stream

} // end namespace java.util.stream
declare namespace org.objectweb.asm {

class Attribute/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	isCodeAttribute(  ):boolean;
	isUnknown(  ):boolean;
	toString(  ):string;

} // end Attribute

} // end namespace org.objectweb.asm
declare namespace org.objectweb.asm {

class Handle/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDesc(  ):string;
	getName(  ):string;
	getOwner(  ):string;
	getTag(  ):int;
	isInterface(  ):boolean;
	toString(  ):string;

} // end Handle

} // end namespace org.objectweb.asm
declare namespace org.objectweb.asm {

class Label/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getOffset(  ):int;
	toString(  ):string;

} // end Label

} // end namespace org.objectweb.asm
declare namespace org.objectweb.asm {

class Type/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getArgumentCount(  ):int;
	getArgumentTypes(  ):[Type];
	getArgumentsAndReturnSizes(  ):int;
	getClassName(  ):string;
	getDescriptor(  ):string;
	getDimensions(  ):int;
	getElementType(  ):Type;
	getInternalName(  ):string;
	getOpcode( arg0:int ):int;
	getReturnType(  ):Type;
	getSize(  ):int;
	getSort(  ):int;
	toString(  ):string;

} // end Type

} // end namespace org.objectweb.asm
declare namespace org.objectweb.asm {

class TypePath/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getLength(  ):int;
	getStep( arg0:int ):int;
	getStepArgument( arg0:int ):int;
	toString(  ):string;

} // end TypePath

} // end namespace org.objectweb.asm
declare namespace org.objectweb.asm {

class TypeReference/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getExceptionIndex(  ):int;
	getFormalParameterIndex(  ):int;
	getSort(  ):int;
	getSuperTypeIndex(  ):int;
	getTryCatchBlockIndex(  ):int;
	getTypeArgumentIndex(  ):int;
	getTypeParameterBoundIndex(  ):int;
	getTypeParameterIndex(  ):int;
	getValue(  ):int;
	toString(  ):string;

} // end TypeReference

} // end namespace org.objectweb.asm
declare namespace org.objectweb.asm.tree {

class AbstractInsnNode/* extends java.lang.Object*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end AbstractInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class ClassNode/* extends org.objectweb.asm.ClassVisitor*/ {

	accept( arg0:any /*org.objectweb.asm.ClassVisitor*/ ):void;
	check( arg0:int ):void;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.ClassVisitor*/;
	toString(  ):string;
	visit( arg0:int, arg1:int, arg2:string, arg3:string, arg4:string, arg5:[string] ):void;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitEnd(  ):void;
	visitField( arg0:int, arg1:string, arg2:string, arg3:string, arg4:any /*java.lang.Object*/ ):any /*org.objectweb.asm.FieldVisitor*/;
	visitInnerClass( arg0:string, arg1:string, arg2:string, arg3:int ):void;
	visitMethod( arg0:int, arg1:string, arg2:string, arg3:string, arg4:[string] ):any /*org.objectweb.asm.MethodVisitor*/;
	visitModule( arg0:string, arg1:int, arg2:string ):any /*org.objectweb.asm.ModuleVisitor*/;
	visitNestHost( arg0:string ):void;
	visitNestMember( arg0:string ):void;
	visitOuterClass( arg0:string, arg1:string, arg2:string ):void;
	visitPermittedSubclass( arg0:string ):void;
	visitRecordComponent( arg0:string, arg1:string, arg2:string ):any /*org.objectweb.asm.RecordComponentVisitor*/;
	visitSource( arg0:string, arg1:string ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;

} // end ClassNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class FieldInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	setOpcode( arg0:int ):void;
	toString(  ):string;

} // end FieldInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class FieldNode/* extends org.objectweb.asm.FieldVisitor*/ {

	accept( arg0:any /*org.objectweb.asm.ClassVisitor*/ ):void;
	check( arg0:int ):void;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.FieldVisitor*/;
	toString(  ):string;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitEnd(  ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;

} // end FieldNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class FrameNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end FrameNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class IincInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end IincInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class InsnList/* extends java.lang.Object implements java.lang.Iterable<any>*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	add( arg0:AbstractInsnNode ):void;
	add( arg0:InsnList ):void;
	clear(  ):void;
	contains( arg0:AbstractInsnNode ):boolean;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	forEach<T>( arg0:Consumer<T> ):void;
	get( arg0:int ):AbstractInsnNode;
	getFirst(  ):AbstractInsnNode;
	getLast(  ):AbstractInsnNode;
	indexOf( arg0:AbstractInsnNode ):int;
	insert( arg0:AbstractInsnNode ):void;
	insert( arg0:AbstractInsnNode, arg1:AbstractInsnNode ):void;
	insert( arg0:AbstractInsnNode, arg1:InsnList ):void;
	insert( arg0:InsnList ):void;
	insertBefore( arg0:AbstractInsnNode, arg1:AbstractInsnNode ):void;
	insertBefore( arg0:AbstractInsnNode, arg1:InsnList ):void;
	iterator(  ):any /*java.util.ListIterator*/;
	iterator( arg0:int ):any /*java.util.ListIterator*/;
	remove( arg0:AbstractInsnNode ):void;
	resetLabels(  ):void;
	set( arg0:AbstractInsnNode, arg1:AbstractInsnNode ):void;
	size(  ):int;
	spliterator(  ):any /*java.util.Spliterator*/;
	toArray(  ):[AbstractInsnNode];
	toString(  ):string;

} // end InsnList

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class InsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end InsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class IntInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	setOpcode( arg0:int ):void;
	toString(  ):string;

} // end IntInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class InvokeDynamicInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end InvokeDynamicInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class JumpInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	setOpcode( arg0:int ):void;
	toString(  ):string;

} // end JumpInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class LabelNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getLabel(  ):org.objectweb.asm.Label;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	resetLabel(  ):void;
	toString(  ):string;

} // end LabelNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class LdcInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end LdcInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class LineNumberNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end LineNumberNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class LocalVariableAnnotationNode/* extends TypeAnnotationNode*/ {

	accept( arg0:any /*org.objectweb.asm.AnnotationVisitor*/ ):void;
	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/, arg1:boolean ):void;
	check( arg0:int ):void;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.AnnotationVisitor*/;
	toString(  ):string;
	visit( arg0:string, arg1:any /*java.lang.Object*/ ):void;
	visitAnnotation( arg0:string, arg1:string ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitArray( arg0:string ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitEnd(  ):void;
	visitEnum( arg0:string, arg1:string, arg2:string ):void;

} // end LocalVariableAnnotationNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class LocalVariableNode/* extends java.lang.Object*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	toString(  ):string;

} // end LocalVariableNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class LookupSwitchInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end LookupSwitchInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class MethodInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	setOpcode( arg0:int ):void;
	toString(  ):string;

} // end MethodInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class MethodNode/* extends org.objectweb.asm.MethodVisitor*/ {

	accept( arg0:any /*org.objectweb.asm.ClassVisitor*/ ):void;
	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	check( arg0:int ):void;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.MethodVisitor*/;
	toString(  ):string;
	visitAnnotableParameterCount( arg0:int, arg1:boolean ):void;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAnnotationDefault(  ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitCode(  ):void;
	visitEnd(  ):void;
	visitFieldInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitFrame( arg0:int, arg1:int, arg2:[any /*java.lang.Object*/], arg3:int, arg4:[any /*java.lang.Object*/] ):void;
	visitIincInsn( arg0:int, arg1:int ):void;
	visitInsn( arg0:int ):void;
	visitInsnAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitIntInsn( arg0:int, arg1:int ):void;
	visitInvokeDynamicInsn( arg0:string, arg1:string, arg2:org.objectweb.asm.Handle, ...arg3:any /*java.lang.Object*/[] ):void;
	visitJumpInsn( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLabel( arg0:org.objectweb.asm.Label ):void;
	visitLdcInsn( arg0:any /*java.lang.Object*/ ):void;
	visitLineNumber( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLocalVariable( arg0:string, arg1:string, arg2:string, arg3:org.objectweb.asm.Label, arg4:org.objectweb.asm.Label, arg5:int ):void;
	visitLocalVariableAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:[org.objectweb.asm.Label], arg3:[org.objectweb.asm.Label], arg4:[int], arg5:string, arg6:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitLookupSwitchInsn( arg0:org.objectweb.asm.Label, arg1:[int], arg2:[org.objectweb.asm.Label] ):void;
	visitMaxs( arg0:int, arg1:int ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string, arg4:boolean ):void;
	visitMultiANewArrayInsn( arg0:string, arg1:int ):void;
	visitParameter( arg0:string, arg1:int ):void;
	visitParameterAnnotation( arg0:int, arg1:string, arg2:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTableSwitchInsn( arg0:int, arg1:int, arg2:org.objectweb.asm.Label, ...arg3:org.objectweb.asm.Label[] ):void;
	visitTryCatchAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTryCatchBlock( arg0:org.objectweb.asm.Label, arg1:org.objectweb.asm.Label, arg2:org.objectweb.asm.Label, arg3:string ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTypeInsn( arg0:int, arg1:string ):void;
	visitVarInsn( arg0:int, arg1:int ):void;

} // end MethodNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class MultiANewArrayInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end MultiANewArrayInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class ParameterNode/* extends java.lang.Object*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	toString(  ):string;

} // end ParameterNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class TableSwitchInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	toString(  ):string;

} // end TableSwitchInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class TryCatchBlockNode/* extends java.lang.Object*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	toString(  ):string;
	updateIndex( arg0:int ):void;

} // end TryCatchBlockNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class TypeAnnotationNode/* extends AnnotationNode*/ {

	accept( arg0:any /*org.objectweb.asm.AnnotationVisitor*/ ):void;
	check( arg0:int ):void;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.AnnotationVisitor*/;
	toString(  ):string;
	visit( arg0:string, arg1:any /*java.lang.Object*/ ):void;
	visitAnnotation( arg0:string, arg1:string ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitArray( arg0:string ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitEnd(  ):void;
	visitEnum( arg0:string, arg1:string, arg2:string ):void;

} // end TypeAnnotationNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class TypeInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	setOpcode( arg0:int ):void;
	toString(  ):string;

} // end TypeInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.tree {

class VarInsnNode/* extends AbstractInsnNode*/ {

	accept( arg0:any /*org.objectweb.asm.MethodVisitor*/ ):void;
	clone( arg0:java.util.Map<LabelNode, LabelNode> ):AbstractInsnNode;
	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getNext(  ):AbstractInsnNode;
	getOpcode(  ):int;
	getPrevious(  ):AbstractInsnNode;
	getType(  ):int;
	setOpcode( arg0:int ):void;
	toString(  ):string;

} // end VarInsnNode

} // end namespace org.objectweb.asm.tree
declare namespace org.objectweb.asm.util {

class ASMifier/* extends Printer*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getText(  ):java.util.List<any /*java.lang.Object*/>;
	print( arg0:any /*java.io.PrintWriter*/ ):void;
	toString(  ):string;
	visit( arg0:int, arg1:int, arg2:string, arg3:string, arg4:string, arg5:[string] ):void;
	visit( arg0:string, arg1:any /*java.lang.Object*/ ):void;
	visitAnnotableParameterCount( arg0:int, arg1:boolean ):ASMifier;
	visitAnnotation( arg0:string, arg1:boolean ):ASMifier;
	visitAnnotation( arg0:string, arg1:string ):ASMifier;
	visitAnnotationDefault(  ):ASMifier;
	visitAnnotationEnd(  ):void;
	visitArray( arg0:string ):ASMifier;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitClassAnnotation( arg0:string, arg1:boolean ):ASMifier;
	visitClassAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitClassEnd(  ):void;
	visitClassTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):ASMifier;
	visitCode(  ):void;
	visitEnum( arg0:string, arg1:string, arg2:string ):void;
	visitExport( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitField( arg0:int, arg1:string, arg2:string, arg3:string, arg4:any /*java.lang.Object*/ ):ASMifier;
	visitFieldAnnotation( arg0:string, arg1:boolean ):ASMifier;
	visitFieldAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitFieldEnd(  ):void;
	visitFieldInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitFieldTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):ASMifier;
	visitFrame( arg0:int, arg1:int, arg2:[any /*java.lang.Object*/], arg3:int, arg4:[any /*java.lang.Object*/] ):void;
	visitIincInsn( arg0:int, arg1:int ):void;
	visitInnerClass( arg0:string, arg1:string, arg2:string, arg3:int ):void;
	visitInsn( arg0:int ):void;
	visitInsnAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):ASMifier;
	visitIntInsn( arg0:int, arg1:int ):void;
	visitInvokeDynamicInsn( arg0:string, arg1:string, arg2:org.objectweb.asm.Handle, ...arg3:any /*java.lang.Object*/[] ):void;
	visitJumpInsn( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLabel( arg0:org.objectweb.asm.Label ):void;
	visitLdcInsn( arg0:any /*java.lang.Object*/ ):void;
	visitLineNumber( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLocalVariable( arg0:string, arg1:string, arg2:string, arg3:org.objectweb.asm.Label, arg4:org.objectweb.asm.Label, arg5:int ):void;
	visitLocalVariableAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:[org.objectweb.asm.Label], arg3:[org.objectweb.asm.Label], arg4:[int], arg5:string, arg6:boolean ):Printer;
	visitLookupSwitchInsn( arg0:org.objectweb.asm.Label, arg1:[int], arg2:[org.objectweb.asm.Label] ):void;
	visitMainClass( arg0:string ):void;
	visitMaxs( arg0:int, arg1:int ):void;
	visitMethod( arg0:int, arg1:string, arg2:string, arg3:string, arg4:[string] ):ASMifier;
	visitMethodAnnotation( arg0:string, arg1:boolean ):ASMifier;
	visitMethodAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitMethodEnd(  ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string, arg4:boolean ):void;
	visitMethodTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):ASMifier;
	visitModule( arg0:string, arg1:int, arg2:string ):Printer;
	visitModuleEnd(  ):void;
	visitMultiANewArrayInsn( arg0:string, arg1:int ):void;
	visitNestHost( arg0:string ):void;
	visitNestMember( arg0:string ):void;
	visitOpen( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitOuterClass( arg0:string, arg1:string, arg2:string ):void;
	visitPackage( arg0:string ):void;
	visitParameter( arg0:string, arg1:int ):void;
	visitParameterAnnotation( arg0:int, arg1:string, arg2:boolean ):ASMifier;
	visitPermittedSubtypeExperimental( arg0:string ):void;
	visitProvide( arg0:string, ...arg1:string[] ):void;
	visitRecordComponentAnnotationExperimental( arg0:string, arg1:boolean ):ASMifier;
	visitRecordComponentAttributeExperimental( arg0:org.objectweb.asm.Attribute ):void;
	visitRecordComponentEndExperimental(  ):void;
	visitRecordComponentExperimental( arg0:int, arg1:string, arg2:string, arg3:string ):ASMifier;
	visitRecordComponentTypeAnnotationExperimental( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):ASMifier;
	visitRequire( arg0:string, arg1:int, arg2:string ):void;
	visitSource( arg0:string, arg1:string ):void;
	visitTableSwitchInsn( arg0:int, arg1:int, arg2:org.objectweb.asm.Label, ...arg3:org.objectweb.asm.Label[] ):void;
	visitTryCatchAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):ASMifier;
	visitTryCatchBlock( arg0:org.objectweb.asm.Label, arg1:org.objectweb.asm.Label, arg2:org.objectweb.asm.Label, arg3:string ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):ASMifier;
	visitTypeAnnotation( arg0:string, arg1:int, arg2:org.objectweb.asm.TypePath, arg3:string, arg4:boolean ):ASMifier;
	visitTypeInsn( arg0:int, arg1:string ):void;
	visitUse( arg0:string ):void;
	visitVarInsn( arg0:int, arg1:int ):void;

} // end ASMifier

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class CheckAnnotationAdapter/* extends org.objectweb.asm.AnnotationVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.AnnotationVisitor*/;
	toString(  ):string;
	visit( arg0:string, arg1:any /*java.lang.Object*/ ):void;
	visitAnnotation( arg0:string, arg1:string ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitArray( arg0:string ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitEnd(  ):void;
	visitEnum( arg0:string, arg1:string, arg2:string ):void;

} // end CheckAnnotationAdapter

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class CheckClassAdapter/* extends org.objectweb.asm.ClassVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.ClassVisitor*/;
	toString(  ):string;
	visit( arg0:int, arg1:int, arg2:string, arg3:string, arg4:string, arg5:[string] ):void;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitEnd(  ):void;
	visitField( arg0:int, arg1:string, arg2:string, arg3:string, arg4:any /*java.lang.Object*/ ):any /*org.objectweb.asm.FieldVisitor*/;
	visitInnerClass( arg0:string, arg1:string, arg2:string, arg3:int ):void;
	visitMethod( arg0:int, arg1:string, arg2:string, arg3:string, arg4:[string] ):any /*org.objectweb.asm.MethodVisitor*/;
	visitModule( arg0:string, arg1:int, arg2:string ):any /*org.objectweb.asm.ModuleVisitor*/;
	visitNestHost( arg0:string ):void;
	visitNestMember( arg0:string ):void;
	visitOuterClass( arg0:string, arg1:string, arg2:string ):void;
	visitPermittedSubclass( arg0:string ):void;
	visitPermittedSubtypeExperimental( arg0:string ):void;
	visitRecordComponent( arg0:string, arg1:string, arg2:string ):any /*org.objectweb.asm.RecordComponentVisitor*/;
	visitRecordComponentExperimental( arg0:int, arg1:string, arg2:string, arg3:string ):any /*org.objectweb.asm.RecordComponentVisitor*/;
	visitSource( arg0:string, arg1:string ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;

} // end CheckClassAdapter

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class CheckFieldAdapter/* extends org.objectweb.asm.FieldVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.FieldVisitor*/;
	toString(  ):string;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitEnd(  ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;

} // end CheckFieldAdapter

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class CheckMethodAdapter/* extends org.objectweb.asm.MethodVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.MethodVisitor*/;
	toString(  ):string;
	visitAnnotableParameterCount( arg0:int, arg1:boolean ):void;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAnnotationDefault(  ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitCode(  ):void;
	visitEnd(  ):void;
	visitFieldInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitFrame( arg0:int, arg1:int, arg2:[any /*java.lang.Object*/], arg3:int, arg4:[any /*java.lang.Object*/] ):void;
	visitIincInsn( arg0:int, arg1:int ):void;
	visitInsn( arg0:int ):void;
	visitInsnAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitIntInsn( arg0:int, arg1:int ):void;
	visitInvokeDynamicInsn( arg0:string, arg1:string, arg2:org.objectweb.asm.Handle, ...arg3:any /*java.lang.Object*/[] ):void;
	visitJumpInsn( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLabel( arg0:org.objectweb.asm.Label ):void;
	visitLdcInsn( arg0:any /*java.lang.Object*/ ):void;
	visitLineNumber( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLocalVariable( arg0:string, arg1:string, arg2:string, arg3:org.objectweb.asm.Label, arg4:org.objectweb.asm.Label, arg5:int ):void;
	visitLocalVariableAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:[org.objectweb.asm.Label], arg3:[org.objectweb.asm.Label], arg4:[int], arg5:string, arg6:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitLookupSwitchInsn( arg0:org.objectweb.asm.Label, arg1:[int], arg2:[org.objectweb.asm.Label] ):void;
	visitMaxs( arg0:int, arg1:int ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string, arg4:boolean ):void;
	visitMultiANewArrayInsn( arg0:string, arg1:int ):void;
	visitParameter( arg0:string, arg1:int ):void;
	visitParameterAnnotation( arg0:int, arg1:string, arg2:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTableSwitchInsn( arg0:int, arg1:int, arg2:org.objectweb.asm.Label, ...arg3:org.objectweb.asm.Label[] ):void;
	visitTryCatchAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTryCatchBlock( arg0:org.objectweb.asm.Label, arg1:org.objectweb.asm.Label, arg2:org.objectweb.asm.Label, arg3:string ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTypeInsn( arg0:int, arg1:string ):void;
	visitVarInsn( arg0:int, arg1:int ):void;

} // end CheckMethodAdapter

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class CheckModuleAdapter/* extends org.objectweb.asm.ModuleVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.ModuleVisitor*/;
	toString(  ):string;
	visitEnd(  ):void;
	visitExport( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitMainClass( arg0:string ):void;
	visitOpen( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitPackage( arg0:string ):void;
	visitProvide( arg0:string, ...arg1:string[] ):void;
	visitRequire( arg0:string, arg1:int, arg2:string ):void;
	visitUse( arg0:string ):void;

} // end CheckModuleAdapter

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class CheckRecordComponentAdapter/* extends org.objectweb.asm.RecordComponentVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.RecordComponentVisitor*/;
	toString(  ):string;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAnnotationExperimental( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitAttributeExperimental( arg0:org.objectweb.asm.Attribute ):void;
	visitEnd(  ):void;
	visitEndExperimental(  ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTypeAnnotationExperimental( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;

} // end CheckRecordComponentAdapter

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class CheckSignatureAdapter/* extends org.objectweb.asm.signature.SignatureVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	toString(  ):string;
	visitArrayType(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitBaseType( arg0:any /*char*/ ):void;
	visitClassBound(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitClassType( arg0:string ):void;
	visitEnd(  ):void;
	visitExceptionType(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitFormalTypeParameter( arg0:string ):void;
	visitInnerClassType( arg0:string ):void;
	visitInterface(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitInterfaceBound(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitParameterType(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitReturnType(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitSuperclass(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitTypeArgument(  ):void;
	visitTypeArgument( arg0:any /*char*/ ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitTypeVariable( arg0:string ):void;

} // end CheckSignatureAdapter

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class Printer/* extends java.lang.Object*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getText(  ):java.util.List<any /*java.lang.Object*/>;
	print( arg0:any /*java.io.PrintWriter*/ ):void;
	toString(  ):string;
	visit( arg0:int, arg1:int, arg2:string, arg3:string, arg4:string, arg5:[string] ):void;
	visit( arg0:string, arg1:any /*java.lang.Object*/ ):void;
	visitAnnotableParameterCount( arg0:int, arg1:boolean ):Printer;
	visitAnnotation( arg0:string, arg1:string ):Printer;
	visitAnnotationDefault(  ):Printer;
	visitAnnotationEnd(  ):void;
	visitArray( arg0:string ):Printer;
	visitClassAnnotation( arg0:string, arg1:boolean ):Printer;
	visitClassAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitClassEnd(  ):void;
	visitClassTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitCode(  ):void;
	visitEnum( arg0:string, arg1:string, arg2:string ):void;
	visitExport( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitField( arg0:int, arg1:string, arg2:string, arg3:string, arg4:any /*java.lang.Object*/ ):Printer;
	visitFieldAnnotation( arg0:string, arg1:boolean ):Printer;
	visitFieldAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitFieldEnd(  ):void;
	visitFieldInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitFieldTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitFrame( arg0:int, arg1:int, arg2:[any /*java.lang.Object*/], arg3:int, arg4:[any /*java.lang.Object*/] ):void;
	visitIincInsn( arg0:int, arg1:int ):void;
	visitInnerClass( arg0:string, arg1:string, arg2:string, arg3:int ):void;
	visitInsn( arg0:int ):void;
	visitInsnAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitIntInsn( arg0:int, arg1:int ):void;
	visitInvokeDynamicInsn( arg0:string, arg1:string, arg2:org.objectweb.asm.Handle, ...arg3:any /*java.lang.Object*/[] ):void;
	visitJumpInsn( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLabel( arg0:org.objectweb.asm.Label ):void;
	visitLdcInsn( arg0:any /*java.lang.Object*/ ):void;
	visitLineNumber( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLocalVariable( arg0:string, arg1:string, arg2:string, arg3:org.objectweb.asm.Label, arg4:org.objectweb.asm.Label, arg5:int ):void;
	visitLocalVariableAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:[org.objectweb.asm.Label], arg3:[org.objectweb.asm.Label], arg4:[int], arg5:string, arg6:boolean ):Printer;
	visitLookupSwitchInsn( arg0:org.objectweb.asm.Label, arg1:[int], arg2:[org.objectweb.asm.Label] ):void;
	visitMainClass( arg0:string ):void;
	visitMaxs( arg0:int, arg1:int ):void;
	visitMethod( arg0:int, arg1:string, arg2:string, arg3:string, arg4:[string] ):Printer;
	visitMethodAnnotation( arg0:string, arg1:boolean ):Printer;
	visitMethodAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitMethodEnd(  ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string, arg4:boolean ):void;
	visitMethodTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitModule( arg0:string, arg1:int, arg2:string ):Printer;
	visitModuleEnd(  ):void;
	visitMultiANewArrayInsn( arg0:string, arg1:int ):void;
	visitNestHost( arg0:string ):void;
	visitNestMember( arg0:string ):void;
	visitOpen( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitOuterClass( arg0:string, arg1:string, arg2:string ):void;
	visitPackage( arg0:string ):void;
	visitParameter( arg0:string, arg1:int ):void;
	visitParameterAnnotation( arg0:int, arg1:string, arg2:boolean ):Printer;
	visitPermittedSubtypeExperimental( arg0:string ):void;
	visitProvide( arg0:string, ...arg1:string[] ):void;
	visitRecordComponentAnnotationExperimental( arg0:string, arg1:boolean ):Printer;
	visitRecordComponentAttributeExperimental( arg0:org.objectweb.asm.Attribute ):void;
	visitRecordComponentEndExperimental(  ):void;
	visitRecordComponentExperimental( arg0:int, arg1:string, arg2:string, arg3:string ):Printer;
	visitRecordComponentTypeAnnotationExperimental( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitRequire( arg0:string, arg1:int, arg2:string ):void;
	visitSource( arg0:string, arg1:string ):void;
	visitTableSwitchInsn( arg0:int, arg1:int, arg2:org.objectweb.asm.Label, ...arg3:org.objectweb.asm.Label[] ):void;
	visitTryCatchAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitTryCatchBlock( arg0:org.objectweb.asm.Label, arg1:org.objectweb.asm.Label, arg2:org.objectweb.asm.Label, arg3:string ):void;
	visitTypeInsn( arg0:int, arg1:string ):void;
	visitUse( arg0:string ):void;
	visitVarInsn( arg0:int, arg1:int ):void;

} // end Printer

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class Textifier/* extends Printer*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getText(  ):java.util.List<any /*java.lang.Object*/>;
	print( arg0:any /*java.io.PrintWriter*/ ):void;
	toString(  ):string;
	visit( arg0:int, arg1:int, arg2:string, arg3:string, arg4:string, arg5:[string] ):void;
	visit( arg0:string, arg1:any /*java.lang.Object*/ ):void;
	visitAnnotableParameterCount( arg0:int, arg1:boolean ):Textifier;
	visitAnnotation( arg0:string, arg1:boolean ):Textifier;
	visitAnnotation( arg0:string, arg1:string ):Textifier;
	visitAnnotationDefault(  ):Textifier;
	visitAnnotationEnd(  ):void;
	visitArray( arg0:string ):Textifier;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitClassAnnotation( arg0:string, arg1:boolean ):Textifier;
	visitClassAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitClassEnd(  ):void;
	visitClassTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitCode(  ):void;
	visitEnum( arg0:string, arg1:string, arg2:string ):void;
	visitExport( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitField( arg0:int, arg1:string, arg2:string, arg3:string, arg4:any /*java.lang.Object*/ ):Textifier;
	visitFieldAnnotation( arg0:string, arg1:boolean ):Textifier;
	visitFieldAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitFieldEnd(  ):void;
	visitFieldInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitFieldTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitFrame( arg0:int, arg1:int, arg2:[any /*java.lang.Object*/], arg3:int, arg4:[any /*java.lang.Object*/] ):void;
	visitIincInsn( arg0:int, arg1:int ):void;
	visitInnerClass( arg0:string, arg1:string, arg2:string, arg3:int ):void;
	visitInsn( arg0:int ):void;
	visitInsnAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitIntInsn( arg0:int, arg1:int ):void;
	visitInvokeDynamicInsn( arg0:string, arg1:string, arg2:org.objectweb.asm.Handle, ...arg3:any /*java.lang.Object*/[] ):void;
	visitJumpInsn( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLabel( arg0:org.objectweb.asm.Label ):void;
	visitLdcInsn( arg0:any /*java.lang.Object*/ ):void;
	visitLineNumber( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLocalVariable( arg0:string, arg1:string, arg2:string, arg3:org.objectweb.asm.Label, arg4:org.objectweb.asm.Label, arg5:int ):void;
	visitLocalVariableAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:[org.objectweb.asm.Label], arg3:[org.objectweb.asm.Label], arg4:[int], arg5:string, arg6:boolean ):Printer;
	visitLookupSwitchInsn( arg0:org.objectweb.asm.Label, arg1:[int], arg2:[org.objectweb.asm.Label] ):void;
	visitMainClass( arg0:string ):void;
	visitMaxs( arg0:int, arg1:int ):void;
	visitMethod( arg0:int, arg1:string, arg2:string, arg3:string, arg4:[string] ):Textifier;
	visitMethodAnnotation( arg0:string, arg1:boolean ):Textifier;
	visitMethodAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitMethodEnd(  ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string, arg4:boolean ):void;
	visitMethodTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitModule( arg0:string, arg1:int, arg2:string ):Printer;
	visitModuleEnd(  ):void;
	visitMultiANewArrayInsn( arg0:string, arg1:int ):void;
	visitNestHost( arg0:string ):void;
	visitNestMember( arg0:string ):void;
	visitOpen( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitOuterClass( arg0:string, arg1:string, arg2:string ):void;
	visitPackage( arg0:string ):void;
	visitParameter( arg0:string, arg1:int ):void;
	visitParameterAnnotation( arg0:int, arg1:string, arg2:boolean ):Textifier;
	visitPermittedSubtypeExperimental( arg0:string ):void;
	visitProvide( arg0:string, ...arg1:string[] ):void;
	visitRecordComponentAnnotationExperimental( arg0:string, arg1:boolean ):Textifier;
	visitRecordComponentAttributeExperimental( arg0:org.objectweb.asm.Attribute ):void;
	visitRecordComponentEndExperimental(  ):void;
	visitRecordComponentExperimental( arg0:int, arg1:string, arg2:string, arg3:string ):Printer;
	visitRecordComponentTypeAnnotationExperimental( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitRequire( arg0:string, arg1:int, arg2:string ):void;
	visitSource( arg0:string, arg1:string ):void;
	visitTableSwitchInsn( arg0:int, arg1:int, arg2:org.objectweb.asm.Label, ...arg3:org.objectweb.asm.Label[] ):void;
	visitTryCatchAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Printer;
	visitTryCatchBlock( arg0:org.objectweb.asm.Label, arg1:org.objectweb.asm.Label, arg2:org.objectweb.asm.Label, arg3:string ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):Textifier;
	visitTypeInsn( arg0:int, arg1:string ):void;
	visitUse( arg0:string ):void;
	visitVarInsn( arg0:int, arg1:int ):void;

} // end Textifier

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class TraceAnnotationVisitor/* extends org.objectweb.asm.AnnotationVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.AnnotationVisitor*/;
	toString(  ):string;
	visit( arg0:string, arg1:any /*java.lang.Object*/ ):void;
	visitAnnotation( arg0:string, arg1:string ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitArray( arg0:string ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitEnd(  ):void;
	visitEnum( arg0:string, arg1:string, arg2:string ):void;

} // end TraceAnnotationVisitor

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class TraceClassVisitor/* extends org.objectweb.asm.ClassVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.ClassVisitor*/;
	toString(  ):string;
	visit( arg0:int, arg1:int, arg2:string, arg3:string, arg4:string, arg5:[string] ):void;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitEnd(  ):void;
	visitField( arg0:int, arg1:string, arg2:string, arg3:string, arg4:any /*java.lang.Object*/ ):any /*org.objectweb.asm.FieldVisitor*/;
	visitInnerClass( arg0:string, arg1:string, arg2:string, arg3:int ):void;
	visitMethod( arg0:int, arg1:string, arg2:string, arg3:string, arg4:[string] ):any /*org.objectweb.asm.MethodVisitor*/;
	visitModule( arg0:string, arg1:int, arg2:string ):any /*org.objectweb.asm.ModuleVisitor*/;
	visitNestHost( arg0:string ):void;
	visitNestMember( arg0:string ):void;
	visitOuterClass( arg0:string, arg1:string, arg2:string ):void;
	visitPermittedSubclass( arg0:string ):void;
	visitPermittedSubtypeExperimental( arg0:string ):void;
	visitRecordComponent( arg0:string, arg1:string, arg2:string ):any /*org.objectweb.asm.RecordComponentVisitor*/;
	visitRecordComponentExperimental( arg0:int, arg1:string, arg2:string, arg3:string ):any /*org.objectweb.asm.RecordComponentVisitor*/;
	visitSource( arg0:string, arg1:string ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;

} // end TraceClassVisitor

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class TraceFieldVisitor/* extends org.objectweb.asm.FieldVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.FieldVisitor*/;
	toString(  ):string;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitEnd(  ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;

} // end TraceFieldVisitor

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class TraceMethodVisitor/* extends org.objectweb.asm.MethodVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.MethodVisitor*/;
	toString(  ):string;
	visitAnnotableParameterCount( arg0:int, arg1:boolean ):void;
	visitAnnotation( arg0:string, arg1:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAnnotationDefault(  ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitAttribute( arg0:org.objectweb.asm.Attribute ):void;
	visitCode(  ):void;
	visitEnd(  ):void;
	visitFieldInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitFrame( arg0:int, arg1:int, arg2:[any /*java.lang.Object*/], arg3:int, arg4:[any /*java.lang.Object*/] ):void;
	visitIincInsn( arg0:int, arg1:int ):void;
	visitInsn( arg0:int ):void;
	visitInsnAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitIntInsn( arg0:int, arg1:int ):void;
	visitInvokeDynamicInsn( arg0:string, arg1:string, arg2:org.objectweb.asm.Handle, ...arg3:any /*java.lang.Object*/[] ):void;
	visitJumpInsn( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLabel( arg0:org.objectweb.asm.Label ):void;
	visitLdcInsn( arg0:any /*java.lang.Object*/ ):void;
	visitLineNumber( arg0:int, arg1:org.objectweb.asm.Label ):void;
	visitLocalVariable( arg0:string, arg1:string, arg2:string, arg3:org.objectweb.asm.Label, arg4:org.objectweb.asm.Label, arg5:int ):void;
	visitLocalVariableAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:[org.objectweb.asm.Label], arg3:[org.objectweb.asm.Label], arg4:[int], arg5:string, arg6:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitLookupSwitchInsn( arg0:org.objectweb.asm.Label, arg1:[int], arg2:[org.objectweb.asm.Label] ):void;
	visitMaxs( arg0:int, arg1:int ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string ):void;
	visitMethodInsn( arg0:int, arg1:string, arg2:string, arg3:string, arg4:boolean ):void;
	visitMultiANewArrayInsn( arg0:string, arg1:int ):void;
	visitParameter( arg0:string, arg1:int ):void;
	visitParameterAnnotation( arg0:int, arg1:string, arg2:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTableSwitchInsn( arg0:int, arg1:int, arg2:org.objectweb.asm.Label, ...arg3:org.objectweb.asm.Label[] ):void;
	visitTryCatchAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTryCatchBlock( arg0:org.objectweb.asm.Label, arg1:org.objectweb.asm.Label, arg2:org.objectweb.asm.Label, arg3:string ):void;
	visitTypeAnnotation( arg0:int, arg1:org.objectweb.asm.TypePath, arg2:string, arg3:boolean ):any /*org.objectweb.asm.AnnotationVisitor*/;
	visitTypeInsn( arg0:int, arg1:string ):void;
	visitVarInsn( arg0:int, arg1:int ):void;

} // end TraceMethodVisitor

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class TraceModuleVisitor/* extends org.objectweb.asm.ModuleVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDelegate(  ):any /*org.objectweb.asm.ModuleVisitor*/;
	toString(  ):string;
	visitEnd(  ):void;
	visitExport( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitMainClass( arg0:string ):void;
	visitOpen( arg0:string, arg1:int, ...arg2:string[] ):void;
	visitPackage( arg0:string ):void;
	visitProvide( arg0:string, ...arg1:string[] ):void;
	visitRequire( arg0:string, arg1:int, arg2:string ):void;
	visitUse( arg0:string ):void;

} // end TraceModuleVisitor

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

class TraceSignatureVisitor/* extends org.objectweb.asm.signature.SignatureVisitor*/ {

	equals( arg0:any /*java.lang.Object*/ ):boolean;
	getDeclaration(  ):string;
	getExceptions(  ):string;
	getReturnType(  ):string;
	toString(  ):string;
	visitArrayType(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitBaseType( arg0:any /*char*/ ):void;
	visitClassBound(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitClassType( arg0:string ):void;
	visitEnd(  ):void;
	visitExceptionType(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitFormalTypeParameter( arg0:string ):void;
	visitInnerClassType( arg0:string ):void;
	visitInterface(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitInterfaceBound(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitParameterType(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitReturnType(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitSuperclass(  ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitTypeArgument(  ):void;
	visitTypeArgument( arg0:any /*char*/ ):any /*org.objectweb.asm.signature.SignatureVisitor*/;
	visitTypeVariable( arg0:string ):void;

} // end TraceSignatureVisitor

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

interface ASMifierSupport {

	asmify( arg0:any /*java.lang.StringBuilder*/, arg1:string, arg2:java.util.Map<org.objectweb.asm.Label, string> ):void;

} // end ASMifierSupport

} // end namespace org.objectweb.asm.util
declare namespace org.objectweb.asm.util {

interface TextifierSupport {

	textify( arg0:any /*java.lang.StringBuilder*/, arg1:java.util.Map<org.objectweb.asm.Label, string> ):void;

} // end TextifierSupport

} // end namespace org.objectweb.asm.util
interface BiConsumer<T, U>/*java.util.function.BiConsumer*/ {

	( arg0:T, arg1:U ):void;
	andThen?( arg0:BiConsumer<T, U> ):BiConsumer<T, U>;

} // end BiConsumer
interface BiFunction<T, U, R>/*java.util.function.BiFunction*/ {

	( arg0:T, arg1:U ):R;
	andThen?<V>( arg0:Func<R, V> ):BiFunction<T, U, V>;

} // end BiFunction
interface BiPredicate<T, U>/*java.util.function.BiPredicate*/ {

	( arg0:T, arg1:U ):boolean;
	and?( arg0:BiPredicate<T, U> ):BiPredicate<T, U>;
	negate?(  ):BiPredicate<T, U>;
	or?( arg0:BiPredicate<T, U> ):BiPredicate<T, U>;

} // end BiPredicate
interface BinaryOperator<T>/*java.util.function.BinaryOperator extends BiFunction<T, any, any>*/ {

	<R,U>( arg0:T, arg1:U ):R;
	// static maxBy<T>( arg0:any /*java.util.Comparator*/ ):BinaryOperator<T>;
	// static minBy<T>( arg0:any /*java.util.Comparator*/ ):BinaryOperator<T>;
	andThen?<R,U,V>( arg0:Func<R, V> ):BiFunction<T, U, V>;

} // end BinaryOperator
interface Consumer<T>/*java.util.function.Consumer*/ {

	( arg0:T ):void;
	andThen?( arg0:Consumer<T> ):Consumer<T>;

} // end Consumer
interface Func<T, R>/*java.util.function.Function*/ {

	( arg0:T ):R;
	// static identity<T>(  ):Func<T, T>;
	andThen?<V>( arg0:Func<R, V> ):Func<T, V>;
	compose?<V>( arg0:Func<V, T> ):Func<V, R>;

} // end Func
interface Predicate<T>/*java.util.function.Predicate*/ {

	( arg0:T ):boolean;
	// static isEqual<T>( arg0:any /*java.lang.Object*/ ):Predicate<T>;
	// static not<T>( arg0:Predicate<T> ):Predicate<T>;
	and?( arg0:Predicate<T> ):Predicate<T>;
	negate?(  ):Predicate<T>;
	or?( arg0:Predicate<T> ):Predicate<T>;

} // end Predicate
interface Supplier<T>/*java.util.function.Supplier*/ {

	(  ):T;

} // end Supplier
interface UnaryOperator<T>/*java.util.function.UnaryOperator extends Function<T, any>*/ {

	<R>( arg0:T ):R;
	// static identity<T>(  ):UnaryOperator<T>;
	andThen?<R,V>( arg0:Func<R, V> ):Func<T, V>;
	compose?<R,V>( arg0:Func<V, T> ):Func<V, R>;

} // end UnaryOperator
