import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { Container, Resources } from "./CatalogPage.style";

const columns: GridColDef[] = [
  {
    field: "thumbnail",
    headerName: "Capa do RED",
    headerAlign: "center",
    flex: 1,
    renderCell: (params: any) => (
      <Box sx={{ justifyContent: "center" }}>
        <img
          src={`https://api.portalmec.c3sl.ufpr.br/${params.value}`}
          alt="thumbnail"
        />
      </Box>
    ),
  },
  {
    field: "name",
    headerName: "Nome do RED",
    headerAlign: "center",
    flex: 2,
  },
  {
    field: "object_type",
    headerName: "Categoria",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "id",
    headerName: "Link",
    headerAlign: "center",
    flex: 1,
    headerClassName: "datagrid-id--header",
    renderCell: (params) => (
      <Box sx={{ justifyContent: "center" }}>
        <Link to={`/recurso/${params.value}`}>
          <OpenInNewIcon sx={{ color: "#F2720C" }} />
        </Link>
      </Box>
    ),
  },
];

export function CustomToolbar() {
  const navigate = useNavigate();
  return (
    <Button
      variant="text"
      style={{
        color: "#F2720C",
        borderColor: "#F2720C",
        marginTop: "10px",
        width: "100%",
      }}
      onClick={() => {
        navigate("/");
      }}
    >
      <ArrowBackIcon />
    </Button>
  );
}

export const Catolog: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.portalmec.c3sl.ufpr.br/v1/learning_objects")
      .then((response) => {
        const resources = [];
        const { data } = response;
        for (let i = 0; i < 5; i += 1) {
          resources.push(...data);
        }
        setRows(resources);
        setLoading(false);
      });
  }, []);

  return (
    <Container
      sx={{
        ".MuiDataGrid-cellContent": {
          margin: "auto",
        },
        "& .datagrid-id--header": {
          "& > .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
          },
        },
        ".MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell":
          {
            justifyContent: "center",
          },
      }}
    >
      <Resources
        rowHeight={120}
        rows={rows}
        columns={columns}
        pageSize={15}
        components={{
          Toolbar: CustomToolbar,
        }}
        loading={loading}
      />
    </Container>
  );
};
