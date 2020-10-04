import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'

import makeData from './makeData'
import Table from './tableComponent';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

function ShowContacts() {
  // Declare a new state variable, which we'll call "count"
  const [contacts, setContacts] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/contacts`)
      .then((res) => {
        // console.log(res?.data?.contacts)
        setContacts(res?.data?.contacts);
        setSpinner(false)
      })
      .catch(err => {
        console.log(err);
      })
  },[])

  const columns = React.useMemo(
    () => [
      {
        Header: 'All Contacts',
        columns: [
          {
            Header: 'NAME',
            accessor: 'customer_name',
          },
          {
            Header: 'COMPANY NAME',
            accessor: 'company_name',
          },
          {
            Header: 'EMAIL',
            accessor: 'email',
          },
          {
            Header: 'PHONE',
            accessor: 'phone',
          },
          {
            Header: 'GST TREATMENT',
            accessor: 'gst_treatment',
          },
          {
            Header: 'RECEIVABLES',
            accessor: 'outstanding_receivable_amount',
          },
          {
            Header: 'PAYABLES',
            accessor: 'outstanding_payable_amount',
          }
        ],
      }
    ],
    []
  )

console.log('data',contacts)
  return (
    <Styles>
      <Table columns={columns} data={contacts} spinner={spinner}/>
    </Styles>
  )
}

export default ShowContacts;