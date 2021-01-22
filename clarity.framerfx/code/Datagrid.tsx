import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import axios from "axios"
import { DataGrid as DataGrid_ } from "../../../clarity-react/dist/datagrid/Datagrid"
import {
    GridSelectionType,
    GridRowType,
} from "../../../clarity-react/dist/datagrid/Datagrid"
import { paginationDetails } from "../../../clarity-react/dist/datagrid/DataGridValues"
import { indentPropertyControlTitle } from "./utils/propertyControls"

export function Datagrid(props) {
    const {
        hasCustomFooter,
        customFooterString,
        hasFooter,
        hasPagination,
        dataUrl,
        ...rest
    } = props
    const [rowsData, setRowsData] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(dataUrl)
            setRowsData(result.data)
        }
        fetchData()
    }, [dataUrl])

    return (
        <Frame size="100%" background={null}>
            <DataGrid_
                {...rest}
                columns={props.columnItems.map((column) => ({
                    columnName: column,
                }))}
                rows={rowsData}
                footer={{
                    footerData: hasCustomFooter ? customFooterString : null,
                    showFooter: hasFooter,
                }}
                selectionType={props.hasSelection && props.selectionType}
                rowType={props.expandable && GridRowType.EXPANDABLE}
                style={{ height: "100%" }}
                pagination={hasPagination && paginationDetails}
                // onRowSelect={() => {
                //     const rows = datagridRef.current!.getSelectedRows()
                //     datagridActionsRef.current!.updateActions(rows)
                //     let j = JSON.stringify(rows)
                //     let jj = JSON.parse(j)
                //     console.log(jj[0].rowID)
                // }}
                // onSelectAll={() => {
                //     const rows = datagridRef.current!.getSelectedRows()
                //     datagridActionsRef.current!.updateActions(rows)
                // }}
            />
        </Frame>
    )
}

Datagrid.defaultProps = {
    columnItems: ["Column 1", "Column 2", "Column 3", "Column 4"],
    showFooter: true,
}

addPropertyControls(Datagrid, {
    dataUrl: {
        type: ControlType.File,
        title: "Data (JSON)",
        allowedFileTypes: ["json"],
    },
    columnItems: {
        type: ControlType.Array,
        title: "Columns",
        propertyControl: {
            type: ControlType.String,
            placeholder: "Type name",
            defaultValue: "New item",
        },
        maxCount: 10,
    },
    hasFooter: {
        type: ControlType.Boolean,
        title: "Show Footer",
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    hasCustomFooter: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Footer",
        enabledTitle: "Custom",
        disabledTitle: "Default",
    },
    customFooterString: {
        type: ControlType.String,
        title: indentPropertyControlTitle("Text"),
        defaultValue: "Custom footer text",
        placeholder: "Footer text",
        hidden: (props) => !props.hasCustomFooter,
    },
    hasSelection: {
        type: ControlType.Boolean,
        title: "Selection",
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    selectionType: {
        type: ControlType.Enum,
        displaySegmentedControl: true,
        title: "Selection Type",
        options: [GridSelectionType.SINGLE, GridSelectionType.MULTI],
        optionTitles: ["Radio", "Checkbox"],
        defaultValue: GridSelectionType.MULTI,
        hidden(props) {
            return props.hasSelection === false
        },
    },
    expandable: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Expandable",
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    hasPagination: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Pagination",
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
})
