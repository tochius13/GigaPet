// Required project object
let pet_info = {
  name: "Torchic",
  weight: 10,
  happiness: 10,
  health: 10,
  skill: 0,
  level: 1,
  exp: 0,
  maxHealth: 10,
  currentHealth: 10
};

// Rival values for battle mode
let rival = {
  name: "Wild Rival",
  maxHealth: 100,
  currentHealth: 100
};

// Updates all text stats on the page
function updateStats() {
  /*
    .text() jQuery method:
    This method changes the text content inside selected HTML elements.
    Here it is used to update the creature's displayed stats, level,
    HP text, and experience after every action.
  */
  $("#pet-name").text(pet_info.name);
  $("#pet-level").text("LV " + pet_info.level);
  $("#pet-weight").text("Weight: " + pet_info.weight);
  $("#pet-happiness").text("Happiness: " + pet_info.happiness);
  $("#pet-health").text("Health: " + pet_info.health);
  $("#pet-skill").text("Skill: " + pet_info.skill);
  $("#pet-exp").text("EXP: " + pet_info.exp + " / 10");
  $("#pet-hp-text").text("HP: " + pet_info.currentHealth + " / " + pet_info.maxHealth);
  $("#enemy-hp-text").text("HP: " + rival.currentHealth + " / " + rival.maxHealth);

  updateHPBars();
}

// Updates HP bar widths
function updateHPBars() {
  let playerPercent = (pet_info.currentHealth / pet_info.maxHealth) * 100;
  let enemyPercent = (rival.currentHealth / rival.maxHealth) * 100;

  $("#pet-hp-bar").css("width", playerPercent + "%");
  $("#enemy-hp-bar").css("width", enemyPercent + "%");
}

// Prevent values from falling below zero
function keepStatsAboveZero() {
  if (pet_info.weight < 0) pet_info.weight = 0;
  if (pet_info.happiness < 0) pet_info.happiness = 0;
  if (pet_info.health < 0) pet_info.health = 0;
  if (pet_info.skill < 0) pet_info.skill = 0;
  if (pet_info.currentHealth < 0) pet_info.currentHealth = 0;
  if (rival.currentHealth < 0) rival.currentHealth = 0;
}

// Handles level-up logic
function gainExp(amount) {
  pet_info.exp += amount;

  while (pet_info.exp >= 10) {
    pet_info.exp -= 10;
    pet_info.level += 1;
    pet_info.skill += 1;
    pet_info.maxHealth += 2;
    pet_info.currentHealth = pet_info.maxHealth;
    showMessage(pet_info.name + " leveled up! It is now level " + pet_info.level + "!");
  }
}

// Shows battle or pet messages
function showMessage(message) {
  const messageBox = $("#pet-message");

  messageBox.stop(true, true);
  messageBox.text(message).show();

  /*
    .slideUp() jQuery method:
    This method hides an element with a sliding animation.
    Here it is used for the pet's visual notification after
    each button press instead of using alert() or console.log().
  */
  setTimeout(function () {
    messageBox.slideUp();
  }, 2400);
}

// Feed action
$("#treat-btn").click(function () {
  pet_info.happiness += 2;
  pet_info.weight += 1;

  keepStatsAboveZero();
  updateStats();
  showMessage(pet_info.name + " enjoyed the food!");
});

// Exercise action
$("#exercise-btn").click(function () {
  pet_info.happiness -= 1;
  pet_info.weight -= 1;
  pet_info.health += 1;
  pet_info.currentHealth += 1;

  if (pet_info.currentHealth > pet_info.maxHealth) {
    pet_info.currentHealth = pet_info.maxHealth;
  }

  keepStatsAboveZero();
  updateStats();
  showMessage(pet_info.name + " exercised and became healthier!");
});

// Play action
$("#play-btn").click(function () {
  pet_info.happiness += 3;
  pet_info.weight -= 1;

  keepStatsAboveZero();
  updateStats();
  showMessage(pet_info.name + " had fun playing!");
});

// Extra action: Train
$("#train-btn").click(function () {
  pet_info.skill += 2;
  pet_info.happiness -= 1;
  pet_info.weight -= 1;
  gainExp(2);

  keepStatsAboveZero();
  updateStats();
  showMessage(pet_info.name + " trained hard and gained experience!");
});

// Extra action: Heal
$("#heal-btn").click(function () {
  pet_info.health += 3;
  pet_info.happiness += 1;
  pet_info.currentHealth += 3;

  if (pet_info.currentHealth > pet_info.maxHealth) {
    pet_info.currentHealth = pet_info.maxHealth;
  }

  keepStatsAboveZero();
  updateStats();
  showMessage(pet_info.name + " has been healed!");
});

// Battle action
$("#battle-btn").click(function () {
  // Reset rival HP if rival was already defeated
  if (rival.currentHealth <= 0) {
    rival.currentHealth = rival.maxHealth;
  }

  let playerAttack = Math.floor(Math.random() * 6) + pet_info.skill + pet_info.level;
  let rivalAttack = Math.floor(Math.random() * 5) + 3;

  rival.currentHealth -= playerAttack;

  if (rival.currentHealth <= 0) {
    rival.currentHealth = 0;
    gainExp(5);
    updateStats();
    showMessage(pet_info.name + " won the battle and gained lots of EXP!");
    return;
  }

  pet_info.currentHealth -= rivalAttack;

  if (pet_info.currentHealth <= 0) {
    pet_info.currentHealth = 0;
    updateStats();
    showMessage(pet_info.name + " lost the battle! Use Heal to recover.");
    return;
  }

  keepStatsAboveZero();
  updateStats();
  showMessage(
    pet_info.name +
      " dealt " +
      playerAttack +
      " damage and took " +
      rivalAttack +
      " damage!"
  );
});

// Initial display
updateStats();