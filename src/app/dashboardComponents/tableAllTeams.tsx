import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import Notification from '../utils/notification';

const API_URL_TEAMS = 'http://localhost:8990';

export default function AllTeams() {
  interface Team {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  }

  const [teams, setTeams] = React.useState<Team[]>([]);
  const [league, setLeague] = React.useState('');
  const [season, setSeason] = React.useState('');
  const [param3, setParam3] = React.useState('');
  const [notification, setNotification] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);


  const handleFetchTeams = async () => {
    const apiKey = localStorage.getItem('api_key');
    try {
      const response = await axios.get(`${API_URL_TEAMS}/api/football/matches`, {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': `${apiKey}`,
        },
        params: {
          league,
          season,
          param3,
        },
      });

      if(response.status === 200){
        setError(null);
        setNotification('Times recuperados com sucesso!');
        setTeams(response.data.response.map((item: any) => item.team));
      } else{
        setNotification(response.data.error);
      }
    } catch (error: any) {
      console.error('Erro ao recuperar os times:', error);
      setNotification(error.response?.data?.message);
    }
  };

  return (
    <div>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="league-label">Liga (ID)</InputLabel>
        <Select
          labelId="league-label"
          id="league"
          value={league}
          onChange={(e) => setLeague(e.target.value)}
          label="Parâmetro 1"
        >
          <MenuItem value=""><em>Nenhum</em></MenuItem>
          <MenuItem value="71">71</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="season-label">Parâmetro 2 (ano)</InputLabel>
        <Select
          labelId="season-label"
          id="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          label="Parâmetro 2"
        >
          <MenuItem value=""><em>Nenhum</em></MenuItem>
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="value2">Valor 2</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="param3-label">Parâmetro 3</InputLabel>
        <Select
          labelId="param3-label"
          id="param3"
          value={param3}
          onChange={(e) => setParam3(e.target.value)}
          label="Parâmetro 3"
        >
          <MenuItem value=""><em>Nenhum</em></MenuItem>
          <MenuItem value="value1">Valor 1</MenuItem>
          <MenuItem value="value2">Valor 2</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleFetchTeams}>
        Buscar Times
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome do Time</TableCell>
              <TableCell align="right">Código</TableCell>
              <TableCell align="right">País</TableCell>
              <TableCell align="right">Fundado</TableCell>
              <TableCell align="right">Nacional</TableCell>
              <TableCell align="right">Logo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell component="th" scope="row">
                  {team.name}
                </TableCell>
                <TableCell align="right">{team.code}</TableCell>
                <TableCell align="right">{team.country}</TableCell>
                <TableCell align="right">{team.founded}</TableCell>
                <TableCell align="right">{team.national ? 'Sim' : 'Não'}</TableCell>
                <TableCell align="right">
                  <img src={team.logo} alt={`${team.name} logo`} width="30" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}