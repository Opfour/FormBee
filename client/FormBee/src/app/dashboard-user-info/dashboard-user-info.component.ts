import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { DashboardReturnModalComponent } from '../dashboard-return-modal/dashboard-return-modal.component';
import { ViewChild, ElementRef } from '@angular/core';
import { DashboardTelegramWidgetComponent } from '../dashboard-telegram-widget/dashboard-telegram-widget.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-user-info',
  standalone: true,
  imports: [ 
    NgIf,
    DashboardReturnModalComponent,
    DashboardTelegramWidgetComponent,
    FormsModule,
   ],
  templateUrl: './dashboard-user-info.component.html',
  styleUrl: './dashboard-user-info.component.scss'
})
export class DashboardUserInfoComponent implements OnInit {
  @Input() githubId: string | undefined;
  @Input() name: string | undefined;
  apiKey: string | undefined;
  displayApiKey: string | undefined;
  usagePercent = 50;
  currentSubs: number = 0.0;
  maxSubs: number = 0.0;
  localHostCurrentSubs: number = 0.0;
  localHostMaxSubs: number = 0.0;
  email: string = "Loading email...";
  emailValid: boolean = false;
  googleEmail: string | undefined;
  returnEmailModal: boolean = false;
  smtpHost: string | undefined;
  smtpPort: number | undefined;
  smtpUsername: string | undefined;
  smtpPassword: string | undefined;
  emailSubject: string | undefined;
  emailBody: string | undefined;
  returnEmailBoolean: boolean = false;
  telegramModal: boolean = false;
  telegramEnabled: boolean = false;
  telegramChat: string | undefined;
  elRef: ElementRef<HTMLElement>;

  constructor(elRef: ElementRef<HTMLElement>) {
    this.elRef = elRef;
  }

  fetchApiKey = async (githubId: string) => {
    console.log("Fetching API key");
    const response = await fetch('http://localhost:3000/api/user/' + githubId);
    const data = await response.json();
    console.log(data);
    if (!data.apiKey) {
      console.log("No API key found");
      fetch('http://localhost:3000/create-api-key/' + githubId, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((dataman) => {
          if (dataman.apiKey) {
            this.apiKey = dataman.apiKey;
          }
          console.log(dataman);
        });
    } else {
      console.log("API key found");
      if (data.apiKey) {
        this.apiKey = data.apiKey;
        this.displayApiKey = this.apiKey;
        this.currentSubs = data.currentSubmissions;
        this.maxSubs = data.maxSubmissions;
        this.localHostCurrentSubs = data.localHostCurrentSubmissions;
        this.localHostMaxSubs = data.localHostMaxSubmissions;
        this.email = data.email;
        if (data.fromEmail) {
          this.googleEmail = data.fromEmail;
        } else {
          this.googleEmail = data.smtpUsername;
        }
        this.smtpHost = data.smtpHost;
        this.smtpPort = data.smtpPort;
        this.smtpUsername = data.smtpUsername;
        this.smtpPassword = data.smtpPassword;
        this.emailSubject = data.emailSubject;
        this.emailBody = data.emailBody;
        this.returnEmailBoolean = data.returnBoolean;
        this.telegramEnabled = data.telegramBoolean;
        this.telegramChat = data.telegramChatId;

        if (this.apiKey) {
          this.displayApiKey = '*'.repeat(this.apiKey.length - 4) + this.apiKey.slice(this.apiKey.length - 4);
        }
      }
    }
  }

  copyToClipboard = () => {
      if(this.apiKey) {
        navigator.clipboard.writeText(this.apiKey);
      }
  }

  newApiKey = () => {
    fetch('http://localhost:3000/regenerate-api-key/' + this.githubId, {
      method: 'post',
    })
    .then((response) => response.json())
    .then((dataman) => {
      if (dataman.apiKey) {
        this.apiKey = dataman.apiKey;
        this.displayApiKey = this.apiKey;
        if (this.apiKey) {
          // Only show the last 4 characters of the API key
          this.displayApiKey = '*'.repeat(this.apiKey.length - 4) + this.apiKey.slice(this.apiKey.length - 4);
        }
      }
     });
  }

  openReturnEmailModal = () => {
    this.returnEmailModal = true;
  }

  closeReturnEmailModal = () => {
    this.returnEmailModal = false;
  }

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  updateEmail = () => {
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    if (emailInput) {
      const email = emailInput.value;
      if (this.isValidEmail(email)) {
      this.emailValid = false;

      fetch('http://localhost:3000/update-email/' + this.githubId, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
        }),
      });
    } else {
      console.error('Email input element is not found.');
      this.emailValid = true;
    }
    } else {
      console.error('Email input element is not found.');
    }
  }



  saveOptions = () => {
    const emailInput = document.getElementById('email-input-return') as HTMLInputElement;
    const passwordInput = document.getElementById('password-input-return') as HTMLInputElement;
    const messageInput = document.getElementById('return-message-input') as HTMLInputElement;
    const returnMessageYes = document.getElementById('return-message-yes') as HTMLInputElement;
    const returnMessageNo = document.getElementById('return-message-no') as HTMLInputElement;

    if (emailInput) {
      const email = emailInput.value;
      const password = passwordInput.value;
      const message = messageInput.value;
      const returnMessage = returnMessageYes.checked ? 'yes' : 'no';
      fetch('http://localhost:3000/update-return-email/' + this.githubId, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailToReturnTo: email,
          password: password,
          message: message,
          returnMessage: returnMessage,
        }),
      });
    } else {
      console.error('Email input element is not found.');
      this.emailValid = true;
    }
  }

  ngOnInit(): void {
    if (!this.githubId) {
      return;
    }
    console.log("Github ID: ", this.githubId);
    this.fetchApiKey(this.githubId);
    this.convertToScript();

  }

  @ViewChild('script', {static: true}) script!: ElementRef;
  convertToScript() {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', "FormbeeBot");
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', 'http://localhost:3000/oauth/telegram/' + this.githubId);
    script.setAttribute('data-request-access', 'write');
  }

  openTelegramModal = () => {
    this.telegramModal = !this.telegramModal;
  }

  async teleSwitch() {
    this.telegramEnabled = !this.telegramEnabled;

    await fetch('http://localhost:3000/telegram/toogle/' + this.githubId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        telegramBoolean: this.telegramEnabled,
      }),
    });
    console.log(this.telegramEnabled);
  }

  async unlinkTelegram() {
    this.telegramChat = undefined;
    await fetch('http://localhost:3000/telegram/unlink/' + this.githubId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log("Telegram unlinked");
  }

}
