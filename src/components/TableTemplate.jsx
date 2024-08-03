import React, {useState} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableRow, styled} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

const TableTemplate = ({columns, rows}) => {
  const [page, setPage] = useState(0);
  const ButtonHaver = "Click Me"

  const [rowsPerPage, setRowsPerPage] = useState(5);
  return (
    <>
      <TableContainer>
        <Table aria-label="sticky table">
          <StyledTableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{minWidth: column.minWidth}}
              >
              </StyledTableCell>
            ))}
            <StyledTableCell align="center">
              Actions
            </StyledTableCell>
          </StyledTableRow>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page == rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={+1} key={row.Id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.Id} align={column.align}>
                          {
                            column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                          }
                        </StyledTableCell>
                      );
                    })}
                    <StyledTableCell align="center">
                      <ButtonHaver row={row}/>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      rowsPerPageOptions={[5, 10, 25, 100]}
      component="div"
      count={rows.size}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(event, newPage) => setPage()}
      onRowsPerPageChange={(event) => {
      setRowsPerPage(parseInt(event.target.value, 5));
      setPage(0);
    }}
    </>
  )
}

export default TableTemplate

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
