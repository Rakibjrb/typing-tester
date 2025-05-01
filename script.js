const texts = [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores aperiam veniam fuga sint, laborum tempora corporis! Fugiat rerum voluptates praesentium qui aspernatur quas labore dolores cumque nobis omnis doloremque, cupiditate iusto ea tenetur nisi magni voluptas culpa architecto facere nemo odit quasi. Inventore suscipit incidunt odio nemo beatae autem recusandae et accusamus consectetur excepturi culpa tempora quas neque, odit non, esse amet pariatur! Facilis quidem dolores sapiente. Odio, architecto quia.",
  "The sun rose over the quiet town, casting golden light on the rooftops. Birds chirped as a gentle breeze rustled the trees. Emma walked down the street, enjoying the peaceful morning. She smiled at a neighbor tending to colorful flowers. The fresh scent of coffee filled the air. Today felt promising, full of new opportunities. With determination in her heart, she embraced the day, ready to chase her dreams.",
  "The waves crashed against the shore as Liam walked along the sandy beach. The salty breeze filled the air, and seagulls soared above. He watched children build sandcastles while surfers rode the rolling waves. The sun began to set, painting the sky with shades of orange and pink. It was a perfect moment of peace, reminding him to cherish life's simple joys and embrace the beauty of nature.",
  "The clock ticked steadily as Mia focused on her book. Raindrops tapped against the window, filling the room with a soothing rhythm. A warm cup of tea sat beside her, steam rising into the air. She loved quiet evenings like this, lost in the pages of a thrilling story. Outside, the city lights shimmered, but inside, she found comfort in the peaceful embrace of her cozy little world.",
  "The forest path was covered in fallen leaves, crunching softly beneath Daniel's boots. Sunlight filtered through the tall trees, casting golden patterns on the ground. Birds sang melodious tunes, and a squirrel darted across his path. The air smelled of pine and earth, fresh and invigorating. Walking through nature always cleared his mind, filling him with peace and inspiration. Each step felt like a journey toward serenity and renewal.",
  "The city buzzed with energy as people hurried along the sidewalks. Car horns echoed through the streets, blending with the chatter of pedestrians. Olivia sipped her coffee, watching the world move around her. A street musician played a lively tune, adding charm to the morning rush. Despite the chaos, she felt calm, embracing the rhythm of the city. Every day was a new adventure, full of endless possibilities.",
];

const generate_random_number = () => {
  return Math.floor(Math.random() * 6);
};

const type_text = texts[generate_random_number()];

const text = document.getElementById("text"),
  display = document.getElementById("display"),
  timer_display = document.getElementById("timer-display"),
  pressed_key = document.getElementById("pressed-key"),
  reload = document.getElementById("reload"),
  type_title = document.getElementById("type-title"),
  modal = document.querySelector(".modal"),
  result_display = document.querySelectorAll(".result-display");

//show text for type and show title
text.textContent = type_text;
const title = `${type_text.split(" ")[0]}  ${type_text.split(" ")[1]}   ${
  type_text.split(" ")[2]
}`;
type_title.textContent = `Type : ${title}`;

//timer handler function that show reveresed timer on right side
let timer = false;
let time = 60;

const timer_handler = (state) => {
  timer = state;

  setInterval(() => {
    if (time === 0) return;
    time = time - 1;
    timer_display.textContent = `${time} s`;
  }, 1000);
};

//detect wrong key pressed
let typed_text = "";
let cursor_position = 0;

const detect_wrong_key_press = (key, position) => {
  if (key != type_text.charAt(position)) {
    display.style.color = "red";
    return;
  }
  display.style.color = "#fff";

  //add the pressed key for display
  typed_text += key;

  //increase the cursor position by 1
  cursor_position += 1;

  //show the final text on display
  display.textContent = typed_text;
};

const main_logic = (key) => {
  if (key === " ") {
    //when pressed space key the display space word on text below
    pressed_key.textContent = "space";
    detect_wrong_key_press(key, cursor_position);
  } else {
    //show pressed key
    pressed_key.textContent = key;
    detect_wrong_key_press(key, cursor_position);
  }
};

const typing_event_handler = (e) => {
  //when timer is stopped the show typing results
  if (time === 0) {
    modal.classList.remove("hide");
    result_display[0].textContent = `${60} second`;
    result_display[1].textContent = title;
    return;
  }

  main_logic(e.key);
  if (timer === true) return;
  timer_handler(true);
};

window.addEventListener("keypress", typing_event_handler);
reload.addEventListener("click", () => {
  location.reload();
});
