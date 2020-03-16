import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import Delete from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import AddModal from '../components/AddModal'
import EditModal from '../components/EditModal'
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

export default class Items extends Component {
  state = {
    items: [], 
    text: ''
  }

  constructor(props){
    super(props);
    this.getData = this.getData.bind(this);
  }

  getData = () => {
    fetch("http://192.168.2.36:5000/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result.items
          });
        },
        (error) => {
          console.log(error)
        }
    )
  }

  deleteItem = (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      };

      fetch("http://192.168.2.36:5000/items/" + id, requestOptions).then((response) => {
          return response.json();
      }).then((result) => {
          this.getData();
      });
  }

  componentDidMount(){
    this.getData();
  }

  handleOpen = () => {
    const [open, setOpen] = React.useState(false);
    setOpen(true);
  }

  render() {
    const columns = [
      {
        name: "id",
        label: "Id",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "id",
        label: "Actions",
        options: {
          filter: true,
          sort: true,
          customBodyRender: value => {
            // const foundItem = this.state.items.find(item => item.id === value);
            return (
              <div>
                <Box p={1} display="flex">
                  <Box px={2}>
                    <Button 
                      color="primary" 
                      variant="contained"
                      disableElevation
                      onClick={() => this.deleteItem(value)}
                    >Delete</Button>
                  </Box>
                  <Box>
                    <EditModal onId={{items: this.state.items, id: value}} onRefresh={this.getData}></EditModal>
                  </Box>
                </Box>
              </div>                       
            );
          }
        }
      }
    ]
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      elevation: 0
    }

    const style = {
      width: '100%'
    }

    return (
        <div>
          <div style={style}>
            <Alert severity="success">This is a success alert — check it out!</Alert>
          </div>
          <MUIDataTable
            title={<AddModal onRefresh={this.getData}></AddModal>}
            data={this.state.items}
            columns={columns}
            options={options}
          />
        </div>
    )
  }
}