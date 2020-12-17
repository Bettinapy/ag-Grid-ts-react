// // format the column expression of the formulated column
// export const formatColumnExpr = (columns: any) => {
//     // iterate through column.formula, check if it's null or not
//     // then check if formula string includes 'if', convert it to ternary 
//     // else, return it without changing
//     return columns.extensionMetaData.map((column: any) => {
//         const colFormula = column.formula;
//         if(colFormula === null) return colFormula;
//         else{
//             if(colFormula.includes('if')){
//                 // remove 'I' and the outermost paranthesis from the formula
//                 const slicedColFormula = colFormula.slice(4, -1);
//                 // remove white space and split the string 
//                 const slicedColFormulaArr = slicedColFormula.replace(/\s/g, "").split(',');
//                 const newColFormula = "if " + slicedColFormulaArr[0] + ' ? ' + slicedColFormulaArr[1] + " : " + slicedColFormulaArr[2]
//                 console.log('if formula', newColFormula)
//                 return newColFormula;
//             }
//             else return colFormula;
//         }
//     })
// } 


export const formatColumnExpr = (column: any) => {
    const colFormula = column.formula;
    if(colFormula === null) return colFormula;
    else{
        if(colFormula.includes('if')){
            // remove 'I' and the outermost paranthesis from the formula
            const slicedColFormula = colFormula.slice(4, -1);
            // remove white space and split the string 
            const slicedColFormulaArr = slicedColFormula.replace(/\s/g, "").split(',');
            const newColFormula = "if " + slicedColFormulaArr[0] + ' ? ' + slicedColFormulaArr[1] + " : " + slicedColFormulaArr[2]
            console.log('if formula', newColFormula)
            return newColFormula;
        }
        else return colFormula;
    }
}

export const getCalculatedColDefList = (columns: any) => {
    const calculatedColDefs = columns.extensionMetaData.filter((column: any) => column.formula !== null).map((column: any) => {
                                return{
                                    ColumnExpression: formatColumnExpr(column),
                                    ColumnId: column.uiColumn,
                                    FriendlyName: column.displayLabel
                                }
                            })
    debugger;
    console.log('calculated cols', calculatedColDefs);
    return calculatedColDefs;
}