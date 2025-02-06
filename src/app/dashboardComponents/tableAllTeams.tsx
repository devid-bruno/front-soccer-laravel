import * as React from 'react';
import { Stack, MenuList, Menu, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import Notification from '../utils/notification';
import { StatisticsModal } from '../components/StatisticsModal';
import MoreIcon from '@mui/icons-material/MoreVert';
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
  const [team, setTeam] = React.useState('');
  const [notification, setNotification] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [statistics, setStatistics] = React.useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null);


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, team: Team) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTeam(null);
  };


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
        },
      });

      if(response.status === 200){
        setError(null);
        setNotification('Times recuperados com sucesso!');
        setTeams(response.data.response.map((item: any) => item.team as Team));
      } else{
        setNotification(response.data.error);
      }
    } catch (error: any) {
      console.error('Erro ao recuperar os times:', error);
      setNotification(error.response?.data?.message);
    }
  };

  const handleFetchStatistics = async (teamId: number) => {
    const apiKey = localStorage.getItem('api_key');
    try {
      const response = await axios.get(`${API_URL_TEAMS}/api/football/teams/statistics`, {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': `${apiKey}`,
        },
        params: {
          league: league,
          season: season,
          team: teamId,
        },
      });

      if(response.status === 200){
        setError(null);
        setStatistics(response.data);
        setIsModalOpen(true);
        setNotification('Estatísticas recuperadas com sucesso!');
      } else{
        setNotification(response.data.error);
      }
    } catch (error: any) {
      console.error('Erro ao recuperar as estatísticas:', error);
      setNotification(error.response?.data?.message);
    }
  }

  React.useEffect(() => {
    setSeason('');
  }, [league]);

  return (
    <div>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="league-label">Liga</InputLabel>
        <Select
          labelId="league-label"
          id="league"
          value={league}
          onChange={(e) => setLeague(e.target.value)}
        >
          <MenuItem value=""><em>Nenhum</em></MenuItem>
          <MenuItem value="71">Brasileirão Série A</MenuItem>
          <MenuItem value="72">Brasileirão Série B</MenuItem>
        </Select>
      </FormControl>
      
      {league && (
        <>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="season-label">Ano</InputLabel>
            <Select
              labelId="season-label"
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <MenuItem value=""><em>Nenhum</em></MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="value2">Valor 2</MenuItem>
            </Select>
          </FormControl>
        </>
      )}

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
              <TableCell align="right">Opções</TableCell>
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
                <TableCell align="right">
                  <Stack direction="column">
                    <MenuList>
                      <Button
                        variant="text"
                        fullWidth
                        startIcon={<MoreIcon  />}
                        onClick={(event) => handleMenuOpen(event, team)}
                        sx={{ justifyContent: 'flex-start' }}
                      >
                      </Button>
                    </MenuList>
                  </Stack>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => selectedTeam?.id && handleFetchStatistics(selectedTeam.id)}>Ver Estatisticas</MenuItem>
                    <MenuItem >Ver jogos</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Últimos resultados</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StatisticsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={statistics}
      />
    </div>
  );
}