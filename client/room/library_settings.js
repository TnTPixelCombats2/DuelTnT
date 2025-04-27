// Imports:
import { Inventory, Teams, Spawns, GameMode } from 'pixel_combats/room';

export function spawn_teams(Teams) {
 Teams.All.forEach(SpawnTeams => {
   SpawnTeams.Spawn();
          } 
 } 

export function set_inventory_preparation() {
 var inventory = Inventory.GetContext();
  inventory.Main.Value = true;
  inventory.Secondary.Value = true;
  inventory.Melee.Value = true;
  inventory.Explosive.Value = true;
  inventory.Build.Value = true;
}
export function set_inventory_gamemode() {
 var inventory = Inventory.GetContext();
  inventory.Main.Value = false;
 if (GameMode.Parameters.GetBool('MainEnableTrue')) {
  inventory.Main.Value = true;
 }
  inventory.Secondary.Value = false;
 if (GameMode.Parameters.GetBool('SecondaryEnableTrue')) {
  inventory.Secondary.Value = true;
 }
  inventory.Melee.Value = false;
 if (GameMode.Parameters.GetBool('MeleeEnableTrue')) {
  inventory.Melee.Value = true;
 }
  inventory.Explosive.Value = false;
 if (GameMode.Parameters.GetBool('ExplosiveEnableTrue')) {
  inventory.Explosive.Value = true;
  inventory.ExplosiveInfinity.Value = true;
 }
if (GameMode.Parameters.GetBool('BuildEnableTrue')) {
  inventory.Build.Value = true;
}
  inventory.Build.Value = false;
}
function set_inventory_winners(Winners) {
 var inventory = Inventory.GetContext(Winners);
  inventory.Main.Value = true;
  inventory.MainInfinity.Value = true;
  inventory.Secondary.Value = true;
  inventory.SecondaryInfinity.Value = true;
  inventory.Melee.Value = true;
  inventory.Explosive.Value = true;
  inventory.ExplosiveInfinity.Value = true;
  inventory.Build.Value = true;
  inventory.BuildInfinity.Value = true;
}
function set_inventory_loosers(Loosers) {
 const inventory = Inventory.GetContext(Loosers);
  inventory.Main.Value = false;
  inventory.Secondary.Value = false;
  inventory.Melee.Value = false;
  inventory.Explosive.Value = false;
  inventory.Build.Value = false;
}



