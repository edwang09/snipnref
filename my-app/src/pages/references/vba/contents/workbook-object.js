import React, { Component } from "react";
import Dropdown from "../../../commons/dropdown";
import Highlight from "react-highlight";

class excelproperties extends Component {
  render() {
    const format = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>expression</h6>
        <p>The String Value to be formated</p>
        <h6>format</h6>
        <p>
          Format can take values from one of the following predefined formats
        </p>
        <div className="col-md-12 col-lg-8">
          <table className="table">
            <tr>
              <td
                data-toggle="tooltip"
                title="number without thousand separators"
              >
                General Number
              </td>
              <td
                data-toggle="tooltip"
                title="thousand separators as well as two decimal places"
              >
                Currency
              </td>
              <td
                data-toggle="tooltip"
                title="at least one digit to the left of the decimal place and two digits to the right of the decimal place"
              >
                Fixed
              </td>
              <td
                data-toggle="tooltip"
                title="thousand separators, at least one digit to the left of the decimal place, and two digits to the right of the decimal place"
              >
                Standard
              </td>
            </tr>
            <tr>
              <td data-toggle="tooltip" title="percent value">
                Percent
              </td>
              <td data-toggle="tooltip" title="Scientific notation">
                Scientific
              </td>
              <td
                data-toggle="tooltip"
                title="Yes, true, on if the number is not 0"
              >
                Yes/No (True/False, On/Off)
              </td>
              <td data-toggle="tooltip" title="display date/time">
                General(long, medium, short) Date(Time)
              </td>
            </tr>
          </table>
        </div>
        <p>Format can also take user defined values, see examples below:</p>
        <Highlight className="vbscript">
          {`  Dim MyTime, MyDate, MyStr
  ' Dates are initialized with double "#"
  MyTime = #17:04:23#
  MyDate = #January 27, 1993#

  MyStr = Format(MyTime, "h:m:s")    ' Returns "17:4:23".
  MyStr = Format(MyTime, "hh:mm:ss AMPM")    ' Returns "05:04:23 PM".
  ' (date can be "d" or "dd", weekday can be "ddd" or "dddd", month can be "m" or "mm" or "mmm" or "mmmm", year can be "yy" or "yyyy")
  MyStr = Format(MyDate, "dddd, mmm d yyyy")    ' Returns "Wednesday, Jan 27 1993".

  ' If format is not supplied, a string is returned.
  MyStr = Format(23)    ' Returns "23".

  ' User-defined formats.
  MyStr = Format(5459.4, "##,##0.00")    ' Returns "5,459.40".
  MyStr = Format(334.9, "###0.00")    ' Returns "334.90".
  MyStr = Format(5, "0.00%")    ' Returns "500.00%".
  MyStr = Format("HELLO", "<")    ' Returns "hello".
  MyStr = Format("This is it", ">")    ' Returns "THIS IS IT".`}
        </Highlight>
      </div>
    );
    const instr = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>start</h6>
        <p>The starting position for the search. (1 by default)</p>
        <h6>string</h6>
        <p>The string to search within</p>
        <h6>substring</h6>
        <p>The substring that you want to find</p>
        <h6>compare</h6>
        <p>
          The type of comparison to perform. It can be one of the following
          values, (Binary by default).
        </p>
        <div className="col-md-12 col-lg-8">
          <table className="table">
            <tr>
              <td
                data-toggle="tooltip"
                title="Performs a comparison using the setting of the Option Compare statement"
              >
                vbUseCompareOption (-1)
              </td>
              <td data-toggle="tooltip" title="Performs a binary comparison">
                vbBinaryCompare (0)
              </td>
              <td data-toggle="tooltip" title="Performs a textual comparison">
                vbTextCompare (1)
              </td>
            </tr>
          </table>
        </div>
        <h5>Examples</h5>
        <Highlight className="vbscript">
          {`  Dim SearchString, SearchChar, MyPos
  SearchString ="XXpXXpXXPXXP"    ' String to search in.
  SearchChar = "P"    ' Search for "P".

  ' Comparison is binary by default (last argument is omitted).
  MyPos = Instr(SearchString, SearchChar)    ' Returns 9.`}
        </Highlight>
      </div>
    );
    const mid = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>text</h6>
        <p>The string that you wish to extract from</p>
        <h6>start</h6>
        <p>The starting position. (The first position in the string is 1)</p>
        <h6>number_of_characters</h6>
        <p>The number of characters that you wish to extract, (1 by default)</p>
        <h5>Examples</h5>
        <Highlight className="vbscript">
          {`  Dim textString
  textString ="E. E. Cummings"    ' String to extract.

  ' Extracts up to five characters from the start of the string.
  MyPos = Left( textString, 5 )    ' Returns "E. E.".

  ' Extracts up to four characters, starting with the seventh character, from the string.
  MyPos = Mid( textString, 7, 4 )    ' Returns "Cumm".
  ' Extracts up to five characters from the end of the string.

  MyPos = Right( textString, 5 )    ' Returns "mings".`}
        </Highlight>
      </div>
    );
    const replace = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>string</h6>
        <p>
          The string to replace a sequence of characters with another set of
          character
        </p>
        <h6>find</h6>
        <p>The string that will be searched for</p>
        <h6>replacement</h6>
        <p>The string that will be replaced by</p>
        <h6>start</h6>
        <p>The position in string to begin the search,(1 by default)</p>
        <h6>count</h6>
        <p>The number of occurrences to replace,(replace all by default)</p>
        <h6>compare</h6>
        <p>
          The type of comparison to perform. It can be one of the following
          values, (Binary by default).
        </p>
        <div className="col-md-12 col-lg-8">
          <table className="table">
            <tr>
              <td data-toggle="tooltip" title="Performs a binary comparison">
                vbBinaryCompare
              </td>
              <td data-toggle="tooltip" title="Performs a textual comparison">
                vbTextCompare
              </td>
            </tr>
          </table>
        </div>

        <h5>Examples</h5>
        <Highlight className="vbscript">
          {`  Replace("alphabet", "bet", "hydro") ' Returns "alphahydro".`}
        </Highlight>
      </div>
    );
    const space = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>number</h6>
        <p>The number of spaces to be returned</p>
        <h5>Examples</h5>
        <Highlight className="vbscript">
          {`  Space(3) ' Returns "   ".`}
        </Highlight>
      </div>
    );
    const split = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>expression</h6>
        <p>The string to split into substrings based on a delimiter</p>
        <h6>delimiter</h6>
        <p>delimiter</p>
        <h6>limit</h6>
        <p>The maximum number of substrings split from expression</p>
        <h6>compare</h6>
        <p>
          The type of comparison to perform. It can be one of the following
          values, (Binary by default).
        </p>
        <div className="col-md-12 col-lg-8">
          <table className="table">
            <tr>
              <td data-toggle="tooltip" title="Performs a binary comparison">
                vbBinaryCompare
              </td>
              <td data-toggle="tooltip" title="Performs a textual comparison">
                vbTextCompare
              </td>
            </tr>
          </table>
        </div>
        <h5>Examples</h5>
        <Highlight className="vbscript">
          {`  Split("172.23.56.4", ".") ' Returns {"172", "23", "56", "4"}.
  Split("A;B;C;D", ";", 2)  ' Returns {"A", "B;C;D"}`}
        </Highlight>
      </div>
    );
    const strcomp = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>string1 and string2</h6>
        <p>The two strings to compare to each other</p>
        <h6>compare</h6>
        <p>
          The type of comparison to perform. It can be one of the following
          values, (Binary by default).
        </p>
        <div className="col-md-12 col-lg-8">
          <table className="table">
            <tr>
              <td
                data-toggle="tooltip"
                title="Performs a comparison using the setting of the Option Compare statement"
              >
                vbUseCompareOption (-1)
              </td>
              <td data-toggle="tooltip" title="Performs a binary comparison">
                vbBinaryCompare (0)
              </td>
              <td data-toggle="tooltip" title="Performs a textual comparison">
                vbTextCompare (1)
              </td>
            </tr>
          </table>
        </div>
        <h5>Examples</h5>
        <Highlight className="vbscript">
          {` StrComp ("Snippet&reference.com", "Snippet&reference.com")'Result: 0

  StrComp ("Snippet&reference.com", "Abc") 'Result: 1

  StrComp ("Snippet&reference.com", "Xyz") 'Result: -1

  StrComp ("Snippet&reference.com", NULL) 'Result: NULL`}
        </Highlight>
      </div>
    );
    const strconv = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>text</h6>
        <p>The string that you wish to convert</p>
        <h6>conversion</h6>
        <p>
          The type of conversion to perform. It can be one of the following
          values.
        </p>
        <div>
          <table className="table">
            <tr>
              <td
                data-toggle="tooltip"
                title="Converts the string to all uppercase"
              >
                vbUpperCase (1)
              </td>
              <td
                data-toggle="tooltip"
                title="Converts the string to all lowercase"
              >
                vbLowerCase (2)
              </td>
              <td
                data-toggle="tooltip"
                title="Converts the first letter to every word to uppercase. All other characters are left as lowercase"
              >
                vbProperCase (3)
              </td>
              <td data-toggle="tooltip" title="Converts the string to Unicode">
                vbUnicode (64)
              </td>
              <td
                data-toggle="tooltip"
                title="Converts the string from Unicode to the default code page of the system"
              >
                vbFromUnicode (128)
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
    const val = (
      <div>
        <h5>Parameter explaination.</h5>
        <h6>string</h6>
        <p>
          A string expression that you wish to return the numbers found within
        </p>

        <h5>Examples</h5>
        <Highlight className="vbscript">
          {` Val("10 Main Street") ' Returns: 10

Val("34 10 Main Street") ' Returns: 3410

Val("  34 - 10 Main Street") ' Returns: 34

Val("075") ' Result: 75`}
        </Highlight>
      </div>
    );
    return (
      <div>
        <h2>Text Manipulation</h2>
        <div className="pl-3">
          <Dropdown
            id="1"
            title="Format ( expression, [ format ] )"
            description="takes a string expression and returns it as a formatted string"
            content={format}
          />
          <Dropdown
            id="2"
            title="InStr( [start], string, substring, [compare] )"
            description="the position of the first occurrence of a substring in a string return 0 if not found"
            content={instr}
          />
          <Dropdown
            id="3"
            title="MID( text, start_position, number_of_characters ), RIGHT( text, [number_of_characters] ), LEFT( text, [number_of_characters] )"
            description="Extracts a substring from a string"
            content={mid}
          />

          <Dropdown
            id="4"
            title="Replace ( string, find, replacement, [start, [count, [compare]]] )"
            description="Replaces a sequence of characters in a string with another set of characters"
            content={replace}
          />
          <Dropdown
            id="5"
            title="Space( number )"
            description="Return a string with a specified number of spaces"
            content={space}
          />

          <Dropdown
            id="6"
            title="Split ( expression [,delimiter] [,limit] [,compare] )"
            description="split a string into substrings based on a delimiter"
            content={split}
          />

          <Dropdown
            id="7"
            title="StrComp ( string1, string2 [, compare ] )"
            description="returns an integer value representing the result of a string comparison"
            content={strcomp}
          />

          <Dropdown
            id="8"
            title="StrConv ( text, conversion )"
            description="returns a string converted to uppercase, lowercase, proper case or Unicode"
            content={strconv}
          />

          <Dropdown
            id="9"
            title="Val( string )"
            description="returns the numbers found in that string"
            content={val}
          />
          <Dropdown
            id="10"
            title="LCase( text ), UCase( text ), LTRIM( text ), RTrim( text ), TRIM( text ), StrReverse( text )"
            description="Basic self-explainary function to change case or remove leading or trailing zeros"
            content="self-explainary"
          />
        </div>

        <p>
          Untracked functions :{" "}
          <span className="text-primary">INSTRREV(), Str()</span>
        </p>
      </div>
    );
  }
}
export default excelproperties;
