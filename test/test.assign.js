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
var zeros = require( '@stdlib/array-base-zeros' );
var map = require( './../lib/assign.js' );


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
			map( value, [ 0 ], naryFunction( abs, 1 ) );
		};
	}
});

tape( 'the function throws an error if not provided a second argument which is either an array-like object or an ndarray', function test( t ) {
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
			map( [ 0 ], value, naryFunction( abs, 1 ) );
		};
	}
});

tape( 'the function throws an error if provided a second argument which is a read-only ndarray', function test( t ) {
	var values;
	var opts;
	var i;

	opts = {
		'readonly': true
	};
	values = [
		array( [ 0 ], opts )
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			map( array( [ 0 ] ), value, naryFunction( abs, 1 ) );
		};
	}
});

tape( 'the function throws an error if provided a third argument which is not a function', function test( t ) {
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
			map( [ 1, 2, 3, 4, 5, 6 ], [ 0, 0, 0, 0, 0, 0 ], value );
		};
	}
});

tape( 'the function throws an error if provided a third argument which is not a function (context)', function test( t ) {
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
			map( [ 1, 2, 3, 4, 5, 6 ], [ 0, 0, 0, 0, 0, 0 ], value, {} );
		};
	}
});

tape( 'the function throws an error if provided array-like objects having different lengths', function test( t ) {
	var values;
	var i;

	values = [
		[],
		[ 0 ],
		[ 0, 0 ],
		[ 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), RangeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			map( [ 1, 2, 3, 4, 5, 6 ], value, naryFunction( abs, 1 ) );
		};
	}
});

tape( 'the function throws an error if provided ndarrays which are not broadcast compatible', function test( t ) {
	var values;
	var i;

	values = [
		array( [ 0 ] ),
		array( [ 0, 0 ] ),
		array( [ 0, 0, 0 ] ),
		array( [ 0, 0, 0, 0 ] ),
		array( [ 0, 0, 0, 0, 0 ] ),
		array( [ 0, 0, 0, 0, 0, 0, 0 ] ),
		array( [ 0, 0, 0, 0, 0, 0, 0, 0 ] ),
		array( [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ),
		array( [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] )
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			map( array( [ 1, 2, 3, 4, 5, 6 ] ), value, naryFunction( abs, 1 ) );
		};
	}
});

tape( 'the function throws an error if not provided either both array-like objects or both ndarrays for the input array arguments', function test( t ) {
	t.throws( fcn1, TypeError, 'throws an error' );
	t.throws( fcn2, TypeError, 'throws an error' );
	t.throws( fcn3, TypeError, 'throws an error' );
	t.throws( fcn4, TypeError, 'throws an error' );
	t.end();

	function fcn1() {
		var x = [ 1, 2, 3, 4, 5, 6 ];
		var y = array( zeros( x.length ), {
			'dtype': 'generic'
		});
		map( x, y, naryFunction( abs, 1 ) );
	}

	function fcn2() {
		var x = [ 1, 2, 3, 4, 5, 6 ];
		var y = array( zeros( x.length ), {
			'dtype': 'generic'
		});
		map( x, y, naryFunction( abs, 1 ), {} );
	}

	function fcn3() {
		var x = array( [ 1, 2, 3, 4, 5, 6 ], {
			'dtype': 'generic'
		});
		var y = zeros( x.length );
		map( x, y, naryFunction( abs, 1 ) );
	}

	function fcn4() {
		var x = array( [ 1, 2, 3, 4, 5, 6 ], {
			'dtype': 'generic'
		});
		var y = zeros( x.length );
		map( x, y, naryFunction( abs, 1 ), {} );
	}
});

tape( 'the function applies a function to array elements (array-like object)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = [ -1, -2, -3, -4, -5, -6 ];
	out = zeros( arr.length );

	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (complex number array)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var out;
	var re;
	var im;
	var v;
	var i;

	arr = new Complex64Array( [ -1, -2, -3, -4, -5, -6 ] );
	out = zeros( arr.length );

	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, out, fcn );

	t.strictEqual( actual, out, 'returns expected value' );
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
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic'
	});
	out = array( zeros( arr.length ), {
		'dtype': 'generic'
	});

	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual.data, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (ndarray; broadcasting)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic',
		'shape': [ 2, 3 ],
		'order': 'row-major'
	});
	out = array( zeros( arr.length*2 ), {
		'dtype': 'generic',
		'shape': [ 2, 2, 3 ],
		'order': 'row-major'
	});

	expected = [ 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual.data, expected, 'returns expected value' );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic',
		'shape': [ 2, 3 ],
		'order': 'column-major'
	});
	out = array( zeros( arr.length*2 ), {
		'dtype': 'generic',
		'shape': [ 2, 2, 3 ],
		'order': 'column-major'
	});

	expected = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual.data, expected, 'returns expected value' );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic',
		'shape': [ 2, 3 ],
		'order': 'column-major'
	});
	out = array( zeros( arr.length*2 ), {
		'dtype': 'generic',
		'shape': [ 2, 2, 3 ],
		'order': 'row-major'
	});

	expected = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual.data, expected, 'returns expected value' );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic',
		'shape': [ 2, 3 ],
		'order': 'row-major'
	});
	out = array( zeros( arr.length*2 ), {
		'dtype': 'generic',
		'shape': [ 2, 2, 3 ],
		'order': 'column-major'
	});

	expected = [ 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual.data, expected, 'returns expected value' );

	t.end();
});

tape( 'the function throws an error if provided ndarrays which are not broadcast compatible', function test( t ) {
	var arr;
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic',
		'shape': [ 6 ]
	});
	out = array( zeros( arr.length ), {
		'dtype': 'generic',
		'shape': [ 2, 3 ],
		'order': 'row-major'
	});

	t.throws( badValues( arr, out ), Error, 'throws an error' );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic',
		'shape': [ 6 ]
	});
	out = array( zeros( arr.length ), {
		'dtype': 'generic',
		'shape': [ 2, 3 ],
		'order': 'column-major'
	});

	t.throws( badValues( arr, out ), Error, 'throws an error' );

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic',
		'shape': [ 3, 2 ],
		'order': 'row-major'
	});
	out = array( zeros( arr.length ), {
		'dtype': 'generic',
		'shape': [ 2, 3 ],
		'order': 'column-major'
	});

	t.throws( badValues( arr, out ), Error, 'throws an error' );

	t.end();

	function badValues( arr, out ) {
		return function fcn() {
			map( arr, out, f );
		};
	}
});

tape( 'the function applies a function to array elements (typed arrays)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = new Float64Array( [ -1, -2, -3, -4, -5, -6 ] );
	out = new Float64Array( arr.length );

	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (empty array)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = [];
	out = [];

	expected = [];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (zero-dimensional ndarray)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = ndarray( 'generic', [ -1 ], [], [ 0 ], 0, 'row-major' );
	out = ndarray( 'generic', [ 0 ], [], [ 0 ], 0, 'row-major' );

	expected = [ 1 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual.data, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (empty ndarray)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = ndarray( 'generic', [ -1, -2, -3, -4 ], [ 2, 1, 2 ], [ 2, 2, 1 ], 0, 'row-major' );
	out = ndarray( 'generic', [ 0, 0, 0, 0 ], [ 2, 0, 2 ], [ 0, 2, 1 ], 0, 'row-major' );

	expected = [ 0, 0, 0, 0 ];
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual.data, expected, 'returns expected value' );
	t.end();
});

tape( 'the function applies a function to array elements (empty typed array)', function test( t ) {
	var expected;
	var actual;
	var arr;
	var out;
	var f;

	f = naryFunction( abs, 1 );

	arr = new Float64Array( [] );
	out = new Float64Array( [] );

	expected = new Float64Array( [] );
	actual = map( arr, out, f );

	t.strictEqual( actual, out, 'returns expected value' );
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
	var out;

	arr = [ -1, -2, -3, -4, -5, -6 ];
	out = zeros( arr.length );

	nargs = [];
	values = [];
	idx = [];
	arrays = [];

	actual = map( arr, out, fcn );

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
	var out;

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic'
	});
	out = array( zeros( arr.length ), {
		'dtype': 'generic'
	});

	nargs = [];
	values = [];
	idx = [];
	arrays = [];

	actual = map( arr, out, fcn );

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
	var out;

	arr = [ -1, -2, -3, -4, -5, -6 ];
	out = zeros( arr.length );

	ctx = {
		'count': 0
	};

	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, out, fcn, ctx );

	t.strictEqual( actual, out, 'returns expected value' );
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
	var out;

	arr = array( [ -1, -2, -3, -4, -5, -6 ], {
		'dtype': 'generic'
	});
	out = array( zeros( arr.length ), {
		'dtype': 'generic'
	});

	ctx = {
		'count': 0
	};

	expected = [ 1, 2, 3, 4, 5, 6 ];
	actual = map( arr, out, fcn, ctx );

	t.strictEqual( actual, out, 'returns expected value' );
	t.deepEqual( actual.data, expected, 'returns expected value' );
	t.strictEqual( ctx.count, 6, 'returns expected value' );

	t.end();

	function fcn( v ) {
		this.count += 1; // eslint-disable-line no-invalid-this
		return abs( v );
	}
});
