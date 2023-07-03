const accountForm = [
  { view: "text", label: "Name", name: "name", value: "Zafarullah Naushad" },
  { view: "text", label: "Username", name: "username", value: "zafar.m3n" },
  {
    view: "text",
    label: "Email",
    name: "email",
    value: "thezafar.m3n@gmail.com",
  },
  {
    view: "text",
    label: "Password",
    name: "password",
    type: "password",
    value: "123456",
    on: {
      onFocus: function () {
        this.define("type", "text");
        this.refresh();
      },
      onBlur: function () {
        this.define("type", "password");
        this.refresh();
      },
    },
  },
  {
    view: "button",
    css: "webix_primary",
    value: "Save",
    click: function () {
      this.getParentView().validate();

      if (this.getParentView().validate()) {
        // Show success message
        webix.message("Account settings successfully saved!");
      } else {
        // Some inputs are empty, show error message
        webix.message({
          type: "error",
          text: "Please fill in all the required fields.",
        });
      }
    },
  },
];

const notificationForm = [
  {
    view: "checkbox",
    label: "Enable Email Notifications",
    name: "emailNotifications",
    id: "emailNotifications",
    value: true,
  },
  {
    view: "checkbox",
    label: "Enable Push Notifications",
    name: "pushNotifications",
    id: "pushNotifications",
    value: true,
  },
  {
    view: "radio",
    label: "Email Frequency",
    name: "emailFrequency",
    options: [
      { id: 1, value: "Daily" },
      { id: 2, value: "Weekly" },
      { id: 3, value: "Monthly" },
    ],
    value: 1,
  },
  {
    view: "radio",
    label: "Push Notification Frequency",
    name: "pushFrequency",
    options: [
      { id: 1, value: "Instant" },
      { id: 2, value: "Hourly" },
      { id: 3, value: "Daily" },
    ],
    value: 1,
  },

  {
    view: "button",
    css: "webix_primary",
    value: "Save",
    click: function () {
      this.getParentView().validate();
      //form.validate()

      if (
        $$("emailNotifications").getValue() ||
        $$("pushNotifications").getValue()
      ) {
        // Show success message
        webix.message("Notification settings successfully saved!");
      } else {
        // Some inputs are empty, show error message
        webix.message({
          type: "error",
          text: "Select at least one type of notification",
        });
      }
    },
  },
];

webix.ready(function () {
  webix.ui({
    rows: [
      {
        view: "toolbar",
        padding: 3,
        elements: [{ view: "label", label: "User Preferences" }],
      },
      {
        view: "tabbar",
        id: "tabbar",
        value: "account",
        options: [
          {
            id: "account",
            icon: "fa-solid fa-user",
            value: "Account",
          },
          {
            id: "notification",
            icon: "fa-solid fa-bell",
            value: "Notification",
          },
          {
            id: "theme",
            icon: "fa-solid fa-palette",
            value: "Theme",
          },
          {
            id: "privacy",
            icon: "fa-solid fa-lock",
            value: "Privacy",
          },
        ],
        on: {
          onChange: function (newVal) {
            $$("multiview").setValue(newVal);
          },
        },
      },
      {
        view: "multiview",
        id: "multiview",
        cells: [
          {
            id: "account",
            rows: [
              {
                view: "label",
                label: "Account Settings",
                css: "settings-header",
              },
              {
                view: "form",
                id: "accountForm",
                scroll: false,
                elements: accountForm,
                rules: {
                  name: function (value) {
                    return value !== "";
                  },
                  username: function (value) {
                    return value !== "";
                  },
                  email: function (value) {
                    return value !== "";
                  },
                  password: function (value) {
                    return value !== "";
                  },
                },
                elementsConfig: {
                  labelPosition: "top",
                },
              },
            ],
            ariaLabel: "Account Settings",
          },
          {
            id: "notification",
            rows: [
              {
                view: "label",
                label: "Notification Settings",
                css: "settings-header",
              },
              {
                view: "form",
                id: "notificationForm",
                scroll: false,
                elements: notificationForm,
                elementsConfig: {
                  labelPosition: "top",
                },
              },
            ],
            ariaLabel: "Notification Settings",
          },
          {
            id: "theme",
            rows: [
              {
                view: "label",
                label: "Theme Settings",
                css: "settings-header",
              },
              {
                view: "form",
                id: "themeForm",
                css: "theme-form-style",
                elements: [
                  {
                    view: "colorpicker",
                    label: "Primary Color",
                    name: "primaryColor",
                    value: "#3498db",
                  },
                  {
                    view: "combo",
                    label: "Font",
                    name: "font",
                    options: [
                      "Arial",
                      "Helvetica",
                      "Times New Roman",
                      "Courier New",
                      "Verdana",
                    ],
                    value: "Arial",
                  },
                  {
                    view: "radio",
                    label: "Layout",
                    name: "layout",
                    options: [
                      { id: "wide", value: "Wide" },
                      { id: "boxed", value: "Boxed" },
                    ],
                    value: "wide",
                  },
                  {
                    cols: [
                      {
                        view: "button",
                        value: "Save",
                        css: "webix_primary",
                        click: saveTheme,
                      },
                    ],
                  },
                ],
              },
            ],
            ariaLabel: "Theme Settings",
          },
          {
            id: "privacy",
            rows: [
              {
                view: "label",
                label: "Privacy Settings",
                css: "settings-header",
              },
              {
                view: "form",
                id: "privacyForm",
                css: "privacy-form-style",
                elements: [
                  {
                    view: "radio",
                    label: "Profile Visibility",
                    name: "profileVisibility",
                    options: [
                      { id: "public", value: "Public" },
                      { id: "private", value: "Private" },
                    ],
                    value: "public",
                  },
                  {
                    view: "checkbox",
                    label: "Share Data with Third Parties",
                    name: "shareData",
                    value: true,
                  },
                  {
                    view: "checkbox",
                    label: "Allow Cookies",
                    name: "allowCookies",
                    value: true,
                  },
                  {
                    view: "checkbox",
                    label: "Enable Two-Factor Authentication",
                    name: "twoFactorAuth",
                    value: true,
                  },
                  {
                    cols: [
                      {
                        view: "button",
                        value: "Save",
                        css: "webix_primary",
                        click: savePrivacy,
                      },
                    ],
                  },
                ],
              },
            ],
            ariaLabel: "Privacy Settings",
          },
        ],
      },
    ],
  });

  function saveTheme() {
    const form = $$("themeForm");

    if (form.validate()) {
      // Show success message
      webix.message("Theme settings successfully saved!");
    } else {
      // Some inputs are empty, show error message
      webix.message({
        type: "error",
        text: "Please fill in all the required fields.",
      });
    }
  }
  function savePrivacy() {
    const form = $$("privacyForm");

    if (form.validate()) {
      // Show success message
      webix.message("Privacy settings successfully saved!");
    } else {
      // Some inputs are empty, show error message
      webix.message({
        type: "error",
        text: "Please fill in all the required fields.",
      });
    }
  }
});
