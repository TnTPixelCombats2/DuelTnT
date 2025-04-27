// Imports:
import { Players, Inventory, Spawns, Game, GameMode, Properties, BuildBlocksSet, LeaderBoard, Ui, Timers, TeamsBalancer, Damage, BreackGraph, NewGame, NewGameVote } from 'pixel_combats/room';
import { DisplayValueHeader } from 'pixel_combats/basic';
import * as DuelTeams from './DuelTeams.js';

// Constants:
const waiting_players_time = 11;
const preparationTime = 73;
const GameModeTime = 271;
const MockModeTime = 171;
const EndMatchTime = 16;
const VoteTime = 11;

const WaitingStateValue = 'Waiting';
const PreparationStateValue = 'Preparation';
const GameStateValue = 'Game';
const MockModeStateValue = 'MockMode';
const EndMatchStateValue = 'EndMatch';

const Winners_SCORES = 25000;
const Kill_SCORES = 120;
const Timer_SCORES = 300;
const TimerInterval_SCORES = 100;
const Loosers_SCORES = 10000;

const MainTimer = Timers.GetContext().Get('Main');
const StateProp = Properties.GetContext().Get('State');
const ScoresTimer = Timers.GetContext().Get('Scores');

// We apply the parameters, to create a room:
const MapRotation = GameMode.Parameters.GetBool('MapRotation');
Damage.GetContext().FriendlyFire.Value = GameMode.Parameters.GetBool('FriendlyFire');
BreackGraph.WeakBlocks = GameMode.Parameters.GetBool('LoosenBlocks');
BreackGraph.OnlyPlayerBlocksDmg = GameMode.Parameters.GetBool('OnlyPlayerBlocksDmg');
// Parameter, block busti:
BreackGraph.PlayerBlockBoost = true;

// The name, of this mode:
Properties.GetContext().GameModeName.Value = 'GameModes/Duel Teams';
TeamsBalancer.IsAutoBalance = true;
Ui.GetContext().MainTimerId.Value = MainTimer.Id;

// Creating, standard commands:
const BlueTeam = Teams.CreateBlueTeam();
const RedTeam = Teams.CreateRedTeam();
BlueTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;
RedTeam.Build.BlocksSet.Value = BuildBlocksSet.Red;

// Creating, a complete leaderboard:
LeaderBoard.PlayerLeaderBoardValues = [
	new DisplayValueHeader('Kills', '<b><size=30><color=#e06e14>ᴷ</color><color=#d65d11>ⁱ</color><color=#cc4c0e>ˡ</color><color=#c23b0b>ˡ</color><color=#b82a08>ˢ</color></size></b>', '<b><size=30><color=#e06e14>ᴷ</color><color=#d65d11>ⁱ</color><color=#cc4c0e>ˡ</color><color=#c23b0b>ˡ</color><color=#b82a08>ˢ</color></size></b>'),
	new DisplayValueHeader('Deaths', '<b><size=30><color=#e06e14>ᴰ</color><color=#d86012>ᵉ</color><color=#d05210>ᵃ</color><color=#c8440e>ᵗ</color><color=#c0360c>ʰ</color><color=#b8280a>ˢ</color></size></b>', '<b><size=30><color=#e06e14>ᴰ</color><color=#d86012>ᵉ</color><color=#d05210>ᵃ</color><color=#c8440e>ᵗ</color><color=#c0360c>ʰ</color><color=#b8280a>ˢ</color></size></b>'),
	new DisplayValueHeader('Spawns', '<b><size=30><color=#e06e14>ˢ</color><color=#d86012>ᵖ</color><color=#d05210>ᵃ</color><color=#c8440e>ʷ</color><color=#c0360c>ⁿ</color><color=#b8280a>ˢ</color></size></b>', '<b><size=30><color=#e06e14>ˢ</color><color=#d86012>ᵖ</color><color=#d05210>ᵃ</color><color=#c8440e>ʷ</color><color=#c0360c>ⁿ</color><color=#b8280a>ˢ</color></size></b>'),
	new DisplayValueHeader('Scores', '<b><size=30><color=#e06e14>ˢ</color><color=#d86012>ᶜ</color><color=#d05210>ᵒ</color><color=#c8440e>ʳ</color><color=#c0360c>ᵉ</color><color=#b8280a>ˢ</color></size></b>', '<b><size=30><color=#e06e14>ˢ</color><color=#d86012>ᶜ</color><color=#d05210>ᵒ</color><color=#c8440e>ʳ</color><color=#c0360c>ᵉ</color><color=#b8280a>ˢ</color></size></b>')
];
LeaderBoard.TeamLeaderBoardValue = new DisplayValueHeader('Scores', '<b><size=30><color=#e06e14>ˢ</color><color=#d86012>ᶜ</color><color=#d05210>ᵒ</color><color=#c8440e>ʳ</color><color=#c0360c>ᵉ</color><color=#b8280a>ˢ</color></size></b>', '<b><size=30><color=#e06e14>ˢ</color><color=#d86012>ᶜ</color><color=#d05210>ᵒ</color><color=#c8440e>ʳ</color><color=#c0360c>ᵉ</color><color=#b8280a>ˢ</color></size></b>');
// Sorting teams, to different leaderboards:
LeaderBoard.TeamWeightGetter.Set(function(Team) {
	return Team.Properties.Get('Scores').Value;
});
LeaderBoard.PlayersWeightGetter.Set(function(Player) {
	return Player.Properties.Get('Scores').Value;
});

// After the death, of the whole team:
RedTeam.Properties.Get('Deaths').Value <= 1) {
BlueTeam.Properties.Get('Deaths').Value <= 1) {
 SetMockMode(leaderboard[0].Team, leaderboard[1].Team);
     }
}
// Frostbite, on the screens during the match:
RedTeam.Properties.Get('Scores').Value = 0;
BlueTeam.Properties.Get('Scores').Value = 0;
Ui.GetContext().TeamProp1.Value = { Team: 'Blue', Prop: 'Scores' };
Ui.GetContext().TeamProp2.Value = { Team: 'Red', Prop: 'Scores' };
 if (StateProp.Value == GameModeStateValue) {
Players.All.forEach(CounterTeams => {
 CounterTeams.Properties.Get('Deaths').Value = 0;
 CounterTeams.Properties.Get('Scores').Value = 0;
 CounterTeams.Properties.Get('Kills').Value = 0;
   }
}

// Request, the team and the player, to spawn:
Teams.OnRequestJoinTeam.Add(function(Player, Team) { Team.Add(Player); });
Teams.OnPlayerChangeTeam.Add(function(Player) { Player.Spawns.Spawn() });

// The player's shield, after respawn:
Spawns.GetContext().OnSpawn.Add(function(Player) {
	Player.Properties.Immortality.Value = true;
	Player.Timers.Get('ImmortalityTimerName').Restart(3);
});
Timers.OnPlayerTimer.Add(function(Timer) {
 if (Timer.Id != ImmortalityTimerName) return;
	Timer.Player.Properties.Immortality.Value = false;
});

// Handlers, systems for leaderboard:
Spawns.OnSpawn.Add(function(Player) {
	++Player.Properties.Spawns.Value;
 if (StateProp.Value == MockModeStateValue) { return };
});
Damage.OnDeath.Add(function(Player) {
	if (StateProp.Value == MockModeStateValue) {
		Spawns.GetContext(Player).Spawn();
		return };
	++Player.Properties.Deaths.Value;
   Spawns.GetContext(Player).Despawn();
   Spawns.GetContext(Player).Enable = false;
   }
});
Damage.OnKill.Add(function(Player, Killed) {
 if (StateProp.Value == MockModeStateValue) return;
	if (Killed.Team != null && Killed.Team != Player.Team) {
		++Player.Properties.Kills.Value;
		Player.Properties.Scores.Value += Kill_SCORES;
		if (StateProp.Value !== MockModeStateValue && Player.Team != null)
			Player.Team.Properties.Get('Scores').Value += Kill_SCORES;
	}
});
// Score timer, for the entire match:
ScoresTimer.OnTimer.Add(function() {
	for (const Player of Players.All) { Player.Properties.Scores.Value += Timer_SCORES;
    if (Player.Team == null) continue; 
	}
});

// Switching modes, to a new match or the end:
MainTimer.OnTimer.Add(function() {
 switch (StateProp.Value) {
case WaitingStateValue:
 SetPreparation();
  break;
case PreparationStateValue:
 SetGameMode();
  break;
case GameModeStateValue:
 SetEndA1Match();
  break;
case MockModeStateValue:
 SetEndMatch();
  break;
case EndMatchStateValue:
 SetRestMatch();
  break;
   }
});
SetWaitingMode();
// Setting, the state of the games when, switching:
function SetWaitingMode() {
 StateProp.Value = WaitingStateValue;
 Ui.GetContext().Hint.Value = 'Waiting players, for daly!';
 Spawns.GetContext().Enable = false;
 MainTimer.Restart(WaitingPlayersTime);
}
function SetPreparation() {
 StateProp.Value = PreparationStateValue;
 Ui.GetContext().Hint.Value = '!Get ready, for the duel - warm up!';
 Spawns.GetContext().Enable = true;
 MainTimer.Restart(PreparationTime);
 SetInventoryPreparation();
 SpawnTeams();
}
function SetGameMode() {
 StateProp.Value = GameModeStateValue;
 Ui.GetContext().Hint.Value = 'Attack, the enemy team!';
 Spawns.GetContext().Despawn();
 MainTimer.Restart(GameModeTime);
 SetInventoryGameMode();
 SpawnTeams();
}
function SetEndA1Match() {
ScoresTimer.Stop();
const leaderboard = LeaderBoard.GetTeams();
 if (leaderboard[0].Weight !== leaderboard[1].Weight) {
SetMockMode(leaderboard[0].Team, leaderboard[1].Team);
 for (const WinTeam of leaderboard[0].Team.Players) {
		 WinTeam.Properties.Scores.Value += Winners_SCORES;
for (const LoosersTeam of leaderboard[1].Team.Players) {
	         LoosersTeam.Properties.Scores.Value -= Loosers_SCORES;
}
         }
   }
}
function SetMockMode(Winners, Loosers) {
StateProp.Value = MockModeStateValue;
MainTimer.Restart(MockModeTime);
ScoresTimer.Stop();
Ui.GetContext(Loosers).Value = 'Defeat, we lost - in a duel!';
Ui.GetContext(Winners).Value = 'Victory, we won the duel - we punish the losers!))';
Spawns.GetContext().RespawnTime.Value = 0;
Player.Properties.Immortality.Value = false;
SpawnTeams();
 SetInventoryWinners(Winners);
 SetInventoryLoosers(Loosers);
}
function SetEndMatch() {
 StateProp.Value = EndMatchStateValue;
 Ui.GetContext().Hint.Value = 'The end of the match, in a duel...';
 Spawns.GetContext().Enable = false;
 Spawns.GetContext().Despawn();
 Game.GameOver(LeaderBoard.GetTeams());
 MainTimer.Restart(EndMatchTime);
  ScoresTimer.Stop();
}
function RestMatch() {
 Map.LoadRandomMap();
if (GameMode.Parameters.GetBool('MapRotation')) {
 function OnVoteResult(Value) {
	if (Value.Result === null) return;
	NewGame.RestartGame(Value.Result);
}
NewGameVote.OnResult.Add(OnVoteResult);

function StartVote() {
	NewGameVote.Start({
		Variants: [{ MapId: 0 }],
		Timer: VoteTime
	}, MapRotation ? 3 : 0);
              }
    }
}

library_settings.spawn_teams();
library_settings.set_inventory_preparation();

ScoresTimer.RestartLoop(TimerInterval_SCORES);
