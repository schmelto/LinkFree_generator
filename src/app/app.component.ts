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
		let currentStepIndex = steps.findIndex((step) => step.hasAttribute("selected"));
		steps[currentStepIndex + 1].setAttribute("disabled", "false");
		steps[currentStepIndex + 1].setAttribute("selected", "true");

		// TODO: hide the clicked button

	}

}
