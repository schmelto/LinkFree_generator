import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Input() selectionChange;
  @ViewChild("themeSettingsPopover") themeSettingsPopover: ElementRef;
  @ViewChild("profileSettingsPopover") profileSettingsPopover: ElementRef;

  constructor() {}

  ngOnInit() {
    this.appVersion();
  }

  handleThemeSettingsToggle(event) {
    this.themeSettingsPopover.nativeElement.showAt(event.detail.targetRef);
  }

  handleThemeChange(event) {
    setTheme(event.detail.selectedItems[0].getAttribute("data-theme"));
    this.themeSettingsPopover.nativeElement.close();
  }

  async appVersion() {
    const response = await fetch(
      "https://api.github.com/repos/schmelto/LinkFree_generator/releases/latest",
      {
        method: "GET",
        mode: "cors",
      }
    );
    const data = await response.json();
    document.getElementById("appVersion").innerHTML = data.name;
  }
}
