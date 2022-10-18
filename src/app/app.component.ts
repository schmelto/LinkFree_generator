import { SafeKeyedRead } from "@angular/compiler";
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  nextStep() {
    let wizard = document.querySelector("ui5-wizard");
    let steps = Array.from(wizard.children);
    let currentStepIndex = steps.findIndex((step) =>
      step.hasAttribute("selected")
    );
    steps[currentStepIndex + 1].setAttribute("disabled", "false");
    steps[currentStepIndex + 1].setAttribute("selected", "true");

    // TODO: hide the clicked button
  }

  generateJson() {
    // get the values from the input fields
    var username = (<HTMLInputElement>document.getElementById("username"))
      .value;
    let name =
      (<HTMLInputElement>document.getElementById("name")).value +
      ` ` +
      (<HTMLInputElement>document.getElementById("surename")).value;
    let type = Array.from(document.getElementById("type").children).filter(
      (type) => type.hasAttribute("pressed")
    )[0].innerHTML;
    let bio = (<HTMLInputElement>document.getElementById("bio")).value;
    let avatar = `https://github.com/${username}.png`;
    var json = {
      name: name,
      type: type,
      bio: bio,
      avatar: avatar,
    };

    console.log(json);
  }
}
