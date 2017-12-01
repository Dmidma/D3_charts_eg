==Domain -> Input  
Range -> Output ==

## Ordinal Scales:

Ordinal scales have a discrete domain and range.  
Eg.  
	Map a set of named categories to a set of colors.

```
d3.scaleOrdinal([range]);
```
* Emtpy domain.
* If no range, it will return undefined.

```
.domain([domain]);
```
* First element in domain will be mapped to the first element in the range, and so on.
* If no domain is specified, it will return the current one.
* An explicit domain is recommended to ensure deterministic behavior.

```
.range([range]);
```
* If there are fewer elements than in the domain, the scale will reuse values from the start of the range.
* If no range is specified, it will return the current one.

```
.unknown([value]);
```
* Sets the output value of the scale for unknown input values.
* If no value is specified, it will return the current one.
```
.copy();
```
* Returns an exact copy.

---

## Band Scales:

They are like ordinal scales except the output range is continuous and numeric.  
Discrete output values are automatically computed by dividing the coutinuous range into uniform bands.  
The unknown value of a band scale is undefined: They do not allow implicit domain construction.

![band scales](https://raw.githubusercontent.com/d3/d3-scale/master/img/band.png)

```
d3.scaleBand();
```
* Constructs a new band scale with:
	* empty domain
	* unit range[0, 1]
	* no padding
	* no rounding
	* center alignment

```
.domain([domain]);
```
* First element in domain will be mapped to the first band, and so on.
* If no domain is specified, it will return the current one.

```
.range([range]);
```
* Sets the scale's range to the specified two-element array of numbers.
If the elemnts in the given array are not numbers, they will de coerced to numbers.
* If no range is specified, it will return the current one.

```
// round is true|false
.round([round]);
```
* If it is enabled, the start and stop of each band will be integers.
* If the width of the domain is not a multiple of the cardinality of the range, use .align() to specify how the leftover space is distributed.

```
.rangeRound([range]);
```
Is the same as:
```
.range(range).round(true);
```

```
// Must be in the range[0, 1]
.paddingInner([padding]);
```
* Determines the ratio of the range that is reserved for blank space between bands.
* If it is not specified, it will returns the current inner padding which defaults to 0.

```
// Must be in the range[0, 1]
.paddingOuter([padding]);
```
* Determines the ratio of the range that is reserved for blank space before the first band and after the last band.
* If it is not specified, it will return the current outer padding which defaults to 0.

```
.padding([padding])
```
* Sets the inner and outer padding to the same padding value.

```
// Must be in the range[0, 1]
.align([align]);
```
* Determines how any leftover unused space in the range is distributed.
* If it is not specified, it will return the current alignment which defaults to 0.5.
* A value of 0.5 indicates that the leftover space should be equally distributed before the first band and after the last band.
* A value of 0 or 1 may be used to shift the bands to one side.

```
.bandwidth();
```
* Returns the width of each band.

```
.step();
```
* Returns the distance between the starts of adjacent bands.

Eg.
```
.domain(["A", "B", "C", "D", "E", "F"])  
.range([0, 960])
```
* "A" will be 0.
* "B" will be 160.
* Each band will have a width of 160.

---
==Include your JavaScript file inside the `body` element, or just after it.==

---

## Array Manipulations:

This is actually not a d3.js functions, but rather pure JavaScript Array functions:

```
var data = [{val: 'hi', num: 5}, {val: 'hello'}, {val: 'Salut'}, {val: 'Hey'}, {val: 'aslema'}];
data.map(function(d) {return d.val;});
```
* will loop over the data array, get the val and return an array just like this: `["hi", "hello", "salut", "Hey", "aslema"]`.  
 
```
function isBigEnough(value) {
  return value >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```
* This function will loop over the array and filter it with the given callback.

---

This functions is actually in d3:
```
d3.max(data, function(d) {return d.val.length;});
```
* It will loop over the array, and determines the maximum value.  
There are also:

```
d3.min();
```


```
d3.keys(object);
```
* Returns an array of string keys for every entry in the object.
* The order of the returned keys is arbitrary.


---

## SI-Prefixes

SI prefixes are used to form decimal multiples and submultiples of SI units.  
They are used to avoid very large or very small numeric values.

Multiplying Factor | SI Prefix | Scientific Notation
-------------------|-----------|--------------------
1 000 000 000 000 000 000 000 000 |yotta (Y) | 1024
1 000 000 000 000 000 000 000 | zetta (Z) | 1021
1 000 000 000 000 000 000 | exa (E) | 1018
1 000 000 000 000 000 | peta (P) | 1015
1 000 000 000 000 | tera (T) | 1012
1 000 000 000 | giga (G) | 109
1 000 000 | mega (M) | 106
1 000 | kilo (k) | 103
0.001 | milli (m) | 10-3
0.000 001 | micro (µ) | 10-6
0.000 000 001 | nano (n) | 10-9
0.000 000 000 001 | pico (p) | 10-12
0.000 000 000 000 001 | femto (f) | 10-15
0.000 000 000 000 000 001 | atto (a) | 10-18
0.000 000 000 000 000 000 001 | zepto (z) | 10-21
0.000 000 000 000 000 000 000 001 | yocto (y) | 10-24



```
d3.format();
```
Its purpose it to format numbers for human consumption.

```
d3.format(".0%")(0.123);  // rounded percentage, "12%"
d3.format("($.2f")(-3.5); // localized fixed-point currency, "(£3.50)"
d3.format("+20")(42);     // space-filled and signed, "                 +42"
d3.format(".^20")(42);    // dot-filled and centered, ".........42........."
d3.format(".2s")(42e6);   // SI-prefix with two significant digits, "42M"
d3.format("#x")(48879);   // prefixed lowercase hexadecimal, "0xbeef"
d3.format(",.2r")(4223);  // grouped thousands with two significant digits, "4,200"
```

---

## Axis

D3 has some function to make the axis display well presented values:

```
d3.axisBotton(x)
	.tickValues([1, 2, 3, 5, 8, 13, 21]);
```
* Use specified values for ticks rather than scale's automatic tik generator.
* If null, clears any previously-set explicit tick values and use scale’s tick generator, then return the current tick values.


```
axis.tickFormat([format]);
```
* format can be used from `d3.format();`
* If specified, sets the tick format function and returns the axis.
* If not specified, returns the current format function, which defaults to null. 
* A null indicates that the `scale.tickFormat()` will be used.