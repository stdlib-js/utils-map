/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var naryFunction = require( '@stdlib/utils-nary-function' );
var abs = require( '@stdlib/math-base-special-abs' );
var Float64Array = require( '@stdlib/array-float64' );
var Complex64Array = require( '@stdlib/array-complex64' );
var array = require( '@stdlib/ndarray-array' );
var ndarray = require( '@stdlib/ndarray-ctor' );
var Complex64 = require( '@stdlib/complex-float32-ctor' );
var realf = require( '@stdlib/complex-float32-real' );
var imagf = require( '@stdlib/complex-float32-imag' );
var map = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof map, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided a first argument which is either an array-like object or an ndarray', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			map( value, naryFunction( abs, 1 ) );
		};
	}
});

tape( 'the function throws an error if provided a second argument which is not a function', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			map( [ 1, 2, 3, 4, 5, 6 ], value );
		};
	}
});

tape( 'the function throws an error if provided a second argument which is not a function (context)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			map( [ 1, 2, 3, 4, 5, 6 ], value, {} );
		};
	}
});

tape( 'the function applies a function to array elements (array-like object)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var f;

	f = naryFunction( abs, 1 );

	arr = [ -1, -2, -3, -4, -5, -6 ];
	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, f );

	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (complex number array)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var re;
	var im;
	var v;
	var i;

	arr = new Complex64Array( [ -1, -2, -3, -4, -5, -6 ] );
	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, fcn );

	for ( i = 0; i < arr.length; i++ ) {
		v = actual[ i ];
		re = realf( v );
		im = imagf( v );
		t.strictEqual( re, expected[ i*2 ], 'returns expected value' );
		t.strictEqual( im, expected[ (i*2)+1 ], 'returns expected value' );
	}
	t.end();

	function fcn( z ) {
		var re = realf( z );
		var im = imagf( z );
		return new Complex64( abs( re ), abs( im ) );
	}
});

tape( 'the function applies a function to array elements (ndarray)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var f;

	f = naryFunction( abs, 1 );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic'
	});
	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, f );

	t.deepEqual( actual.data, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (typed arrays)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var f;

	f = naryFunction( abs, 1 );

	arr = new Float64Array( [ -1, -2, -3, -4, -5, -6 ] );
	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, f );

	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (empty array)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var f;

	f = naryFunction( abs, 1 );

	arr = [];
	expected = [];
	actual = map( arr, f );

	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (zero-dimensional ndarray)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var f;

	f = naryFunction( abs, 1 );

	arr = ndarray( 'generic', [ -1 ], [], [ 0 ], 0, 'row-major' );
	expected = [ 1 ];
	actual = map( arr, f );

	t.deepEqual( actual.data, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (empty ndarray)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var f;

	f = naryFunction( abs, 1 );

	arr = ndarray( 'generic', [], [ 2, 0, 2 ], [ 0, 2, 1 ], 0, 'row-major' );
	expected = [];
	actual = map( arr, f );

	t.deepEqual( actual.data, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (empty typed array)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var f;

	f = naryFunction( abs, 1 );

	arr = new Float64Array( [] );
	expected = [];
	actual = map( arr, f );

	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});

tape( 'the function invokes an applied function with three arguments (array-like object)', function test( t ) {
	var expected;
	var actual;
	var values;
	var arrays;
	var nargs;
	var idx;
	var arr;

	arr = [ -1, -2, -3, -4, -5, -6 ];

	nargs = [];
	values = [];
	idx = [];
	arrays = [];

	actual = map( arr, fcn );

	expected = [ 1, 2, 3, 4, 5, 6 ];
	t.deepEqual( actual, expected, 'returns expected value' );

	expected = [ -1, -2, -3, -4, -5, -6 ];
	t.deepEqual( values, expected, 'returns expected value' );

	expected = [ 0, 1, 2, 3, 4, 5 ];
	t.deepEqual( idx, expected, 'returns expected value' );

	expected = [ arr, arr, arr, arr, arr, arr ];
	t.deepEqual( arrays, expected, 'returns expected value' );

	expected = [ 3, 3, 3, 3, 3, 3 ];
	t.deepEqual( nargs, expected, 'returns expected value' );

	t.end();

	function fcn( v, i, arr ) {
		nargs.push( arguments.length );
		values.push( v );
		idx.push( i );
		arrays.push( arr );
		return abs( v );
	}
});

tape( 'the function invokes an applied function with three arguments (ndarray)', function test( t ) {
	var expected;
	var actual;
	var values;
	var arrays;
	var nargs;
	var idx;
	var arr;

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic'
	});

	nargs = [];
	values = [];
	idx = [];
	arrays = [];

	actual = map( arr, fcn );

	expected = [ 1, 2, 3, 4, 5, 6 ];
	t.deepEqual( actual.data, expected, 'returns expected value' );

	expected = [ -1, -2, -3, -4, -5, -6 ];
	t.deepEqual( values, expected, 'returns expected value' );

	expected = [ 0, 1, 2, 3, 4, 5 ];
	t.deepEqual( idx, expected, 'returns expected value' );

	expected = [ arr, arr, arr, arr, arr, arr ];
	t.deepEqual( arrays, expected, 'returns expected value' );

	expected = [ 3, 3, 3, 3, 3, 3 ];
	t.deepEqual( nargs, expected, 'returns expected value' );

	t.end();

	function fcn( v, i, arr ) {
		nargs.push( arguments.length );
		values.push( v );
		idx.push( i );
		arrays.push( arr );
		return abs( v );
	}
});

tape( 'the function supports providing a `this` context (array-like object)', function test( t ) {
	var expected;
	var actual;
	var ctx;
	var arr;

	arr = [ -1, -2, -3, -4, -5, -6 ];

	ctx = {
		'count': 0
	};

	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, fcn, ctx );

	t.deepEqual( actual, expected, 'returns expected value' );
	t.strictEqual( ctx.count, 6, 'returns expected value' );

	t.end();

	function fcn( v ) {
		this.count += 1; // eslint-disable-line no-invalid-this
		return abs( v );
	}
});

tape( 'the function supports providing a `this` context (ndarray)', function test( t ) {
	var expected;
	var actual;
	var ctx;
	var arr;

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic'
	});

	ctx = {
		'count': 0
	};

	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, fcn, ctx );

	t.deepEqual( actual.data, expected, 'returns expected value' );
	t.strictEqual( ctx.count, 6, 'returns expected value' );

	t.end();

	function fcn( v ) {
		this.count += 1; // eslint-disable-line no-invalid-this
		return abs( v );
	}
});
