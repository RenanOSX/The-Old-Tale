import monsterImg from "../assets/monster.png";

export default function Monster({name, image=monsterImg, health, maxhealth}) {
    return(
    <span>
        <center><h1>{name}</h1></center>
        <center><img src={image} alt="Alt Text"></img></center>
        <center><h1>{health} / {maxhealth} HP</h1></center>
    </span>
    );
}