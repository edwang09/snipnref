import React, { Component } from "react";

export default class getstart extends Component {
  render() {
    return (
      <div>
        <p className="h5">This is to get start</p>
        <p className="">
          Visual Basic for Applications (VBA) is an implementation of
          Microsoft's event-driven programming language Visual Basic 6, which
          was discontinued in 2008, and its associated integrated development
          environment (IDE). Although Visual Basic is no longer supported or
          updated by Microsoft, the VBA programming language was upgraded in
          2010 with the introduction of Visual Basic for Applications 7 in
          Microsoft Office applications.
        </p>
        <p className="">
          Visual Basic for Applications enables building user-defined functions
          (UDFs), automating processes and accessing Windows API and other
          low-level functionality through dynamic-link libraries (DLLs). It
          supersedes and expands on the abilities of earlier
          application-specific macro programming languages such as Word's
          WordBASIC. It can be used to control many aspects of the host
          application, including manipulating user interface features, such as
          menus and toolbars, and working with custom user forms or dialog
          boxes.
        </p>
        <p className="">
          As its name suggests, VBA is closely related to Visual Basic and uses
          the Visual Basic Runtime Library. However, VBA code normally can only
          run within a host application, rather than as a standalone program.
          VBA can, however, control one application from another using OLE
          Automation. For example, VBA can automatically create a Microsoft Word
          report from Microsoft Excel data that Excel collects automatically
          from polled sensors. VBA can use, but not create, ActiveX/COM DLLs,
          and later versions add support for class modules.
        </p>
        <p className="">
          VBA is built into most Microsoft Office applications, including Office
          for Mac OS X (except version 2008), and other Microsoft applications,
          including Microsoft MapPoint and Microsoft Visio. VBA is also
          implemented, at least partially, in applications published by
          companies other than Microsoft, including ArcGIS, AutoCAD, CorelDraw,
          LibreOffice, Reflection, SolidWorks and WordPerfect.
        </p>
      </div>
    );
  }
}
