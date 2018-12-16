export const events = [
  {
    name: "AfterCalculate()",
    description:
      "Occurs when all pending refresh activity and calculations have been completed.",
    parameters: [],
    remarks: [
      "This event occurs after all Worksheet . Calculate , Chart . Calculate , AfterRefresh , and SheetChange events.",
      "Add-in developers use the AfterCalculate event to know when all the data in the workbook has been fully updated by any queries and/or calculations that may have been in progress."
    ]
  },
  {
    name: "NewWorkbook(Wb)",
    description: "Occurs when a new workbook is created.",
    parameters: [
      {
        name: "Wb",
        type: "Workbook",
        description: "The newly created workbook, (required)"
      }
    ],
    remarks: [],
    example: `Private Sub App_NewWorkbook(ByVal Wb As Workbook) 
 Application.Windows.Arrange xlArrangeStyleTiled 
End Sub`
  },
  {
    name:
      "ProtectedViewWindowActivate \r\n ProtectedViewWindowDeactivate \r\n ProtectedViewWindowOpen \r\n ProtectedViewWindowResize( Pvw )",
    description:
      "Occurs when a Protected View window is activated/deactivated/opened/resized.",
    parameters: [
      {
        name: "Pvw",
        type: "ProtectedViewWindow",
        description:
          "The activated/deactivated/opened/resized Protected View window, (required)"
      }
    ],
    remarks: [
      "A Protected View window is used to display a workbook from a potentially unsafe location. Unsafe locations are defined as the following",
      "1. Files opened from the Internet",
      "2. Attachments opened from Outlook.",
      "3. Files blocked by File Block Policy.",
      "4. Files that fail Office File Validation.",
      "5. Files explicitly opened in Protected View by using the Open in Protected View command of the Open button in the Open dialog box.",
      "Workbooks displayed in a Protected View window cannot be edited and are restricted from running active content such as Visual Basic for Applications macros and data connections"
    ]
  },
  {
    name: "ProtectedViewWindowBeforeClose( Pvw , Reason , Cancel )",
    description:
      "Occurs immediately before a Protected View window or a workbook in a Protected View window closes.",
    parameters: [
      {
        name: "Pvw",
        type: "ProtectedViewWindow",
        description: "The Protected View window that is closed, (required)"
      },
      {
        name: "Reason",
        type: "XlProtectedViewCloseReason",
        description:
          "specifies the reason the Protected View window is closed, (required)"
      },
      {
        name: "Cancel",
        type: "Boolean",
        description:
          "False when the event occurs. If the event procedure sets this argument to True , the window does not close when the procedure is finished, (required)"
      }
    ],
    remarks: [
      "A Protected View window is used to display a workbook from a potentially unsafe location. Unsafe locations are defined as the following",
      "1. Files opened from the Internet",
      "2. Attachments opened from Outlook.",
      "3. Files blocked by File Block Policy.",
      "4. Files that fail Office File Validation.",
      "5. Files explicitly opened in Protected View by using the Open in Protected View command of the Open button in the Open dialog box.",
      "Workbooks displayed in a Protected View window cannot be edited and are restricted from running active content such as Visual Basic for Applications macros and data connections"
    ],
    example: `Private Sub App_ProtectedViewWindowBeforeClose(ByVal Pvw as ProtectedViewWindow, _ 
  Reason as XlProtectedViewCloseReason, Cancel as Boolean) 
  a = MsgBox("Do you really want to close the Protected View window?", _ 
  vbYesNo) 
  If a = vbNo Then Cancel = True 
End Sub`
  },
  {
    name: "ProtectedViewWindowBeforeEdit ( Pvw , Cancel )",
    description:
      "Occurs immediately before editing is enabled on the workbook in the specified Protected View window.",
    parameters: [
      {
        name: "Pvw",
        type: "ProtectedViewWindow",
        description:
          "The Protected View window that is enabled for editing, (required)"
      },
      {
        name: "Cancel",
        type: "Boolean",
        description:
          "False when the event occurs. If the event procedure sets this argument to True , editing is not enabled on the workbook, (required)"
      }
    ],
    remarks: [
      "A Protected View window is used to display a workbook from a potentially unsafe location. Unsafe locations are defined as the following",
      "1. Files opened from the Internet",
      "2. Attachments opened from Outlook.",
      "3. Files blocked by File Block Policy.",
      "4. Files that fail Office File Validation.",
      "5. Files explicitly opened in Protected View by using the Open in Protected View command of the Open button in the Open dialog box.",
      "Workbooks displayed in a Protected View window cannot be edited and are restricted from running active content such as Visual Basic for Applications macros and data connections"
    ],
    example: `Private Sub App_ProtectedViewWindowBeforeEdit(ByVal Pvw As ProtectedViewWindow, Cancel As Boolean) 
  Dim intResponse As Integer 
  
  intResponse = MsgBox("Do you really want to edit the workbook?", vbYesNo) 
  
  If intResponse = vbNo Then Cancel = True 
End Sub`
  },
  {
    name: "ProtectedViewWindowBeforeEdit ( Pvw , Cancel )",
    description:
      "Occurs immediately before editing is enabled on the workbook in the specified Protected View window.",
    parameters: [
      {
        name: "Pvw",
        type: "ProtectedViewWindow",
        description:
          "The Protected View window that is enabled for editing, (required)"
      },
      {
        name: "Cancel",
        type: "Boolean",
        description:
          "False when the event occurs. If the event procedure sets this argument to True , editing is not enabled on the workbook, (required)"
      }
    ],
    remarks: [
      "A Protected View window is used to display a workbook from a potentially unsafe location. Unsafe locations are defined as the following",
      "1. Files opened from the Internet",
      "2. Attachments opened from Outlook.",
      "3. Files blocked by File Block Policy.",
      "4. Files that fail Office File Validation.",
      "5. Files explicitly opened in Protected View by using the Open in Protected View command of the Open button in the Open dialog box.",
      "Workbooks displayed in a Protected View window cannot be edited and are restricted from running active content such as Visual Basic for Applications macros and data connections"
    ],
    example: `Private Sub App_ProtectedViewWindowBeforeEdit(ByVal Pvw As ProtectedViewWindow, Cancel As Boolean) 
  Dim intResponse As Integer 
  
  intResponse = MsgBox("Do you really want to edit the workbook?", vbYesNo) 
  
  If intResponse = vbNo Then Cancel = True 
End Sub`
  },
  {
    name:
      "SheetActivate \r\n SheetBeforeDelete \r\n SheetCalculate \r\n SheetDeactivate  ( Sh )",
    description:
      "Occurs when any sheet is activated / before delete / recalculated / deactivated.",
    parameters: [
      {
        name: "Sh",
        type: "Object",
        description:
          "The activated sheet. Can be a Chart or Worksheet object, (required)"
      }
    ]
  },
  {
    name: "SheetChange ( Sh , Target) ",
    description:
      "Occurs when cells in any worksheet are changed by the user or by an external link",
    parameters: [
      {
        name: "Sh",
        type: "Object",
        description: "A Worksheet object that represents the sheet"
      },
      {
        name: "Target",
        type: "Range",
        description: "The changed range"
      }
    ],
    remarks: ["This event doesn't occur on chart sheets"]
  },
  {
    name: "SheetFollowHyperlink ( Sh , Target) ",
    description: "Occurs when you click any hyperlink in Microsoft Excel",
    parameters: [
      {
        name: "Sh",
        type: "Object",
        description: "The Worksheet object that contains the hyperlink"
      },
      {
        name: "Target",
        type: "Hyperlink",
        description:
          "The Hyperlink object that represents the destination of the hyperlink"
      }
    ]
  },
  {
    name:
      "SheetBeforeDoubleClick \r\n SheetBeforeRightClick  ( Sh , Target , Cancel) ",
    description:
      "Occurs when any worksheet is double-clicked(right-clicked), before the default double-click action",
    parameters: [
      {
        name: "Sh",
        type: "Object",
        description: "A Worksheet object that represents the sheet"
      },
      {
        name: "Target",
        type: "Range",
        description:
          "The cell nearest to the mouse pointer when the right-click occurred"
      },
      {
        name: "Cancel",
        type: "Boolean",
        description:
          "False when the event occurs. If the event procedure sets this argument to True , action isn't performed when the procedure is finished."
      }
    ],
    remarks: ["This event doesn't occur on chart sheets"]
  },
  {
    name:
      "WindowActivate  \r\n WindowDeactivate \r\n WindowResize ( Wb , Wn ) ",
    description:
      "Occurs when any workbook window is activated(deactivated/resized)",
    parameters: [
      {
        name: "Wb",
        type: "Workbook",
        description:
          "The workbook displayed in the activated(deactivated/resized) window"
      },
      {
        name: "Wn",
        type: "Window",
        description: "The activated(deactivated/resized) window."
      }
    ]
  },
  {
    name:
      "WorkbookOpen   \r\n WorkbookActivate  \r\n WorkbookDeactivate  ( Wb ) ",
    description: "Occurs when any workbook is opened(activated/deactivated)",
    parameters: [
      {
        name: "Wb",
        type: "Workbook",
        description: "The workbook opened(activated/deactivated)"
      }
    ]
  },
  {
    name: "WorkbookBeforeClose \r\n WorkbookBeforePrint ( Wb, Cancel ) ",
    description: "Occurs immediately before any workbook is closed(printed)",
    parameters: [
      {
        name: "Wb",
        type: "Workbook",
        description: "The workbook being closed(printed)"
      },
      {
        name: "Cancel",
        type: "Boolean",
        description:
          "False when the event occurs. If the event procedure sets this argument to True , action isn't performed when the procedure is finished."
      }
    ],
    example: `Private Sub App_WorkbookBeforeClose(ByVal Wb as Workbook, Cancel as Boolean)
   a = MsgBox("Do you really want to close the workbook?", _
   vbYesNo)
   If a = vbNo Then Cancel = True
  End Sub`
  },
  {
    name: "WorkbookNewSheet ( Wb, Sh ) ",
    description: "Occurs when a new sheet is created in any open workbook",
    parameters: [
      {
        name: "Wb",
        type: "Workbook",
        description: "The workbook"
      },
      {
        name: "Sh",
        type: "Object",
        description: "The new sheet"
      }
    ],
    example: `Private Sub App_WorkbookNewSheet(ByVal Wb As Workbook, ByVal Sh As Object)
   Sh.Move After:=Wb.Sheets(Wb.Sheets.Count)
  End Sub`
  },
  {
    name: " WorkbookNewChart  ( Wb, Ch ) ",
    description: "Occurs when a new chart is created in any open workbook",
    parameters: [
      {
        name: "Wb",
        type: "Workbook",
        description: "The workbook"
      },
      {
        name: "Ch",
        type: "Chart",
        description: "The new chart"
      }
    ],
    example: `Private Sub App_NewChart(ByVal Wb As Workbook, ByVal Ch As Chart)
   MsgBox ("A new chart was added to: " &; Wb.Name &; " of type: " &; Ch.Type)
  End Sub`
  },
  {
    name: " WorkbookBeforeSave ( Wb, SaveAsUI, Cancel ) ",
    description: "Occurs before any open workbook is saved",
    parameters: [
      {
        name: "Wb",
        type: "Workbook",
        description: "The workbook"
      },
      {
        name: "SaveAsUI",
        type: "Boolean",
        description:
          "True if the Save As dialog box will be displayed due to changes made that need to be saved in the workbook."
      },
      {
        name: "Cancel",
        type: "Boolean",
        description:
          "False when the event occurs. If the event procedure sets this argument to True , action isn't performed when the procedure is finished."
      }
    ],
    example: `Private Sub App_WorkbookBeforeSave(ByVal Wb As Workbook, ByVal SaveAsUI As Boolean, Cancel as Boolean)
   a = MsgBox("Do you really want to save the workbook?", vbYesNo)
   If a = vbNo Then Cancel = True
  End Sub`
  },
  {
    name: " WorkbookAfterSave ( Wb, SaveAsUI, Cancel ) ",
    description: "Occurs before any open workbook is saved",
    parameters: [
      {
        name: "Wb",
        type: "Workbook",
        description: "The workbook"
      },
      {
        name: "Success",
        type: "Boolean",
        description:
          "Returns True if the save operation was successful; otherwise False."
      }
    ],
    example: `Private Sub App_WorkbookAfterSave(ByVal Wb As Workbook, ByVal Success As Boolean)
    If Success Then
     MsgBox ("The " &; Wb.Name &; " workbook was successfully saved.")
    End If
  End Sub`
  }
];

export const methods = [
  {
    name: "ActivateMicrosoftApp ( Index )",
    description: "Activates a Microsoft application, Word, Excel, Access etc.",
    parameters: [
      {
        name: "application",
        type: "XlMSApplication",
        description:
          "The Microsoft application to activate( xlMicrosoftAccess(4), xlMicrosoftFoxPro(5), xlMicrosoftMail(3), xlMicrosoftPowerPoint(2), xlMicrosoftProject(6), xlMicrosoftSchedulePlus(7), xlMicrosoftWord(1))"
      }
    ],
    example: `Application.ActivateMicrosoftApp xlMicrosoftWord`
  },
  {
    name: "Calculate \r\n CalculateFull \r\n CalculateFullRebuild ",
    description:
      "(Full) calculate (and rebuild dependency) the all open workbooks.",
    example: `If Application.CalculationVersion <> _ 
  Workbooks(1).CalculationVersion Then 
  Application.CalculateFull 
End If`
  },
  {
    name: "Intersect  ( Arg1 ~ Arg30 )",
    description:
      "Returns a Range object that represents the rectangular intersection of two or more ranges",
    parameters: [
      {
        name: "Arg",
        type: "Range",
        description:
          "The intersecting ranges. At least two Range objects must be specified."
      }
    ],
    remarks: [
      "If one or more ranges from a different worksheet are specified, an error will be returned."
    ],
    example: `Worksheets("Sheet1").Activate 
    Set isect = Application.Intersect(Range("rg1"), Range("rg2")) 
    If isect Is Nothing Then 
     MsgBox "Ranges do not intersect" 
    Else 
     isect.Select 
    End If`
  },
  {
    name:
      "InputBox (Prompt, Title, Default, Left, Top, HelpFile, HelpContextID, Type)",
    description:
      "Returns a Range object that represents the rectangular intersection of two or more ranges",
    parameters: [
      {
        name: "Prompt",
        type: "String",
        description: "The message to be displayed in the dialog box"
      },
      {
        name: "Title",
        type: "Variant",
        description:
          "The title for the input box. If this argument is omitted, the default title is Input., (optional)"
      },
      {
        name: "Default",
        type: "Variant",
        description:
          "Specifies a value that will appear in the text box when the dialog box is initially displayed. (can be a Range object), (optional)"
      },
      {
        name: "Left",
        type: "Variant",
        description:
          "Specifies an x position for the dialog box in relation to the upper-left corner of the screen, in points., (optional)"
      },
      {
        name: "Top",
        type: "Variant",
        description:
          "	Specifies a y position for the dialog box in relation to the upper-left corner of the screen, in points., (optional)"
      },
      {
        name: "HelpFile",
        type: "Variant",
        description:
          "The name of the Help file for this input box.(a Help button will appear), (optional)"
      },
      {
        name: "HelpContextID",
        type: "Variant",
        description: "The context ID number of the Help topic, (optional)"
      },
      {
        name: "Type",
        type: "Variant",
        description: "Specifies the return data type., (optional)"
      }
    ],
    example: `myNum = Application.InputBox("Enter a number")`
  },
  {
    name: "FindFile()",
    description: "Displays the Open dialog box, return boolean on success",

    remarks: [
      "This method displays the Open dialog box and allows the user to open a file. If a new file is opened successfully, this method returns True . If the user cancels the dialog box, this method returns False."
    ],
    example: `Application.FindFile`
  },
  {
    name: "Goto( Reference , Scroll )",
    description:
      "Selects any range or Visual Basic procedure in any workbook, and activates that workbook if it's not already active",
    parameters: [
      {
        name: "Reference",
        type: "Variant",
        description:
          "The destination. Can be a Range object, a string that contains a cell reference in R1C1-style notation, or a string that contains a Visual Basic procedure name. If this argument is omitted, the destination is the last range you used the Goto method to select."
      },
      {
        name: "Scroll",
        type: "Boolean",
        description:
          "True to scroll through the window so that the upper-left corner of the range appears in the upper-left corner of the window. False to not scroll through the window. The default is False."
      }
    ],
    remarks: [
      "This method displays the Open dialog box and allows the user to open a file. If a new file is opened successfully, this method returns True . If the user cancels the dialog box, this method returns False."
    ],
    example: `Application.FindFile`
  },
  {
    name:
      "GetOpenFilename ( FileFilter , FilterIndex , Title , ButtonText , MultiSelect )",
    description:
      "Displays the standard Open dialog box and gets a file name from the user without actually opening any files",
    parameters: [],
    remarks: []
  },
  {
    name:
      "GetSaveAsFilename ( InitialFilename , FileFilter , FilterIndex , Title , ButtonText )",
    description:
      "Displays the standard Save As dialog box and gets a file name from the user without actually saving any files",
    parameters: [],
    remarks: []
  }
];
