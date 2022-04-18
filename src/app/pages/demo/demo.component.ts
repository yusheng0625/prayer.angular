import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrayerDetail, PrayerState } from 'src/app/core/model';
import { Config } from 'src/app/core/Config';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PaygrowComponent } from './paygrow/paygrow.component';
import { CacheService, PrayerService } from 'src/app/core/service';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  //bBoughtSeed:boolean = false;
  prayer:string = '';

  iActivePraysayItem:number = -1;
  payingSay:string="";

  payingStep:number = 0;
  percent:number = 0;
  percentStep:number = 0;

  detail:PrayerDetail = null;
  bInit:boolean = false;
  id:number = 0;

  full_grown:boolean = false;

  state:PrayerState = null;

  praySays:string[]=[
    "John 3:16: For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "Jer 29:11: For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.",
    "Rom 8:28: And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    "Phil 4:13: I can do everything through him who gives me strength.",
    "Gen 1:1: In the beginning God created the heavens and the earth.",
    "Prov 3:5: Trust in the LORD with all your heart and lean not on your own understanding.",
    "Prov 3:6: in all your ways acknowledge him, and he will make your paths straight.",
    "Rom 12:2: Do not conform any longer to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.",
    "Phil 4:6: Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God.",
    "Matt 28:19: Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
    "Eph 2:8: For it is by grace you have been saved, through faith—and this not from yourselves, it is the gift of God—",
    "Gal 5:22: But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness,",
    "Rom 12:1: Therefore, I urge you, brothers, in view of God’s mercy, to offer your bodies as living sacrifices, holy and pleasing to God—this is your spiritual act of worship.",
    "John 10:10: The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.",
    "Acts 18:10: For I am with you, and no one is going to attack and harm you, because I have many people in this city.”",
    "Acts 18:9: One night the Lord spoke to Paul in a vision: “Do not be afraid; keep on speaking, do not be silent.",
    "Acts 18:11: So Paul stayed for a year and a half, teaching them the word of God.",
    "Gal 2:20: I have been crucified with Christ and I no longer live, but Christ lives in me. The life I live in the body, I live by faith in the Son of God, who loved me and gave himself for me.",
    "1 John 1:9: If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
    "Rom 3:23: for all have sinned and fall short of the glory of God,",
    "John 14:6: Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.",
    "Matt 28:20: and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.”",
    "Rom 5:8: But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
    "Phil 4:8: Finally, brothers, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.",
    "Phil 4:7: And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    "Josh 1:9: Have I not commanded you? Be strong and courageous. Do not be terrified; do not be discouraged, for the LORD your God will be with you wherever you go.”",
    "Isa 40:31: but those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    "Eph 2:9: not by works, so that no one can boast.",
    "Rom 6:23: For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
    "Gal 5:23: gentleness and self-control. Against such things there is no law.",
    "Isa 53:5: But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was upon him, and by his wounds we are healed.",
    "1 Pet 3:15: But in your hearts set apart Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect,",
    "2 Tim 3:16: All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness,",
    "Matt 6:33: But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    "Heb 12:2: Let us fix our eyes on Jesus, the author and perfecter of our faith, who for the joy set before him endured the cross, scorning its shame, and sat down at the right hand of the throne of God.",
    "1 Pet 5:7: Cast all your anxiety on him because he cares for you.",
    "Eph 2:10: For we are God’s workmanship, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "1 Cor 10:13: No temptation has seized you except what is common to man. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can stand up under it.",
    "Matt 11:28: “Come to me, all you who are weary and burdened, and I will give you rest.",
    "Heb 11:1: Now faith is being sure of what we hope for and certain of what we do not see.",
    "2 Cor 5:17: Therefore, if anyone is in Christ, he is a new creation; the old has gone, the new has come!",
    "Heb 13:5: Keep your lives free from the love of money and be content with what you have, because God has said, “Never will I leave you; never will I forsake you.”",
    "2 Cor 12:9: But he said to me, “My grace is sufficient for you, for my power is made perfect in weakness.” Therefore I will boast all the more gladly about my weaknesses, so that Christ’s power may rest on me.",
    "Rom 10:9: That if you confess with your mouth, “Jesus is Lord,” and believe in your heart that God raised him from the dead, you will be saved.",
    "Isa 41:10: So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    "Gen 1:26: Then God said, “Let us make man in our image, in our likeness, and let them rule over the fish of the sea and the birds of the air, over the livestock, over all the earth, and over all the creatures that move along the ground.”",
    "Matt 11:29: Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
    "John 16:33: “I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.”",
    "Acts 1:8: But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.”",
    "2 Tim 1:7: For God did not give us a spirit of timidity, but a spirit of power, of love and of self-discipline.",
    "Isa 53:4: Surely he took up our infirmities and carried our sorrows, yet we considered him stricken by God, smitten by him, and afflicted.",
    "2 Cor 5:21: God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.",
    "Rom 15:13: May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    "John 11:25: Jesus said to her, “I am the resurrection and the life. He who believes in me will live, even though he dies;",
    "Heb 11:6: And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.",
    "John 5:24: “I tell you the truth, whoever hears my word and believes him who sent me has eternal life and will not be condemned; he has crossed over from death to life.",
    "Jas 1:2: Consider it pure joy, my brothers, whenever you face trials of many kinds,",
    "Isa 53:6: We all, like sheep, have gone astray, each of us has turned to his own way; and the LORD has laid on him the iniquity of us all.",
    "Acts 2:38: Peter replied, “Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit.",
    "Eph 3:20: Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us,",
    "Matt 11:30: For my yoke is easy and my burden is light.”",
    "Gen 1:27: So God created man in his own image, in the image of God he created him; male and female he created them.",
    "Col 3:12: Therefore, as God’s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.",
    "Heb 12:1: Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles, and let us run with perseverance the race marked out for us.",
    "Jas 5:16: Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous man is powerful and effective.",
    "Acts 17:11: Now the Bereans were of more noble character than the Thessalonians, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true.",
    "Phil 4:19: And my God will meet all your needs according to his glorious riches in Christ Jesus.",
    "John 1:1: In the beginning was the Word, and the Word was with God, and the Word was God.",
    "1 Cor 6:19: Do you not know that your body is a temple of the Holy Spirit, who is in you, whom you have received from God? You are not your own;",
    "1 John 3:16: This is how we know what love is: Jesus Christ laid down his life for us. And we ought to lay down our lives for our brothers.",
    "Ps 133:1: How good and pleasant it is when brothers live together in unity!",
    "John 14:27: Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    "Heb 4:12: For the word of God is living and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.",
    "John 15:13: Greater love has no one than this, that he lay down his life for his friends.",
    "Mic 6:8: He has showed you, O man, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.",
    "Rom 10:17: Consequently, faith comes from hearing the message, and the message is heard through the word of Christ.",
    "John 1:12: Yet to all who received him, to those who believed in his name, he gave the right to become children of God—",
    "Jas 1:12: Blessed is the man who perseveres under trial, because when he has stood the test, he will receive the crown of life that God has promised to those who love him.",
    "Jas 1:3: because you know that the testing of your faith develops perseverance.",
    "Rom 8:38: For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers,",
    "Rom 8:39: neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
    "Heb 10:25: Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another—and all the more as you see the Day approaching.",
    "2 Pet 1:4: Through these he has given us his very great and precious promises, so that through them you may participate in the divine nature and escape the corruption in the world caused by evil desires.",
    "Phil 1:6: being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.",
    "Ps 133:3: It is as if the dew of Hermon were falling on Mount Zion. For there the LORD bestows his blessing, even life forevermore.",
    "Heb 4:16: Let us then approach the throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.",
    "Ps 37:4: Delight yourself in the LORD and he will give you the desires of your heart.",
    "John 3:17: For God did not send his Son into the world to condemn the world, but to save the world through him.",
    "Acts 4:12: Salvation is found in no one else, for there is no other name under heaven given to men by which we must be saved.”",
    "Isa 26:3: You will keep in perfect peace him whose mind is steadfast, because he trusts in you.",
    "1 Pet 2:24: He himself bore our sins in his body on the tree, so that we might die to sins and live for righteousness; by his wounds you have been healed.",
    "Josh 1:8: Do not let this Book of the Law depart from your mouth; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.",
    "Matt 28:18: Then Jesus came to them and said, “All authority in heaven and on earth has been given to me.",
    "Col 3:23: Whatever you do, work at it with all your heart, as working for the Lord, not for men,",
    "Matt 22:37: Jesus replied: ” ‘Love the Lord your God with all your heart and with all your soul and with all your mind.’",
    "Ps 133:2: It is like precious oil poured on the head, running down on the beard, running down on Aaron’s beard, down upon the collar of his robes.",
    "Matt 5:16: In the same way, let your light shine before men, that they may see your good deeds and praise your Father in heaven.",
    "Isa 55:8: “For my thoughts are not your thoughts, neither are your ways my ways,” declares the LORD.",
    "Heb 4:15: For we do not have a high priest who is unable to sympathize with our weaknesses, but we have one who has been tempted in every way, just as we are—yet was without sin.",
    "John 13:35: By this all men will know that you are my disciples, if you love one another.”"
  ];
    
  constructor(private route: ActivatedRoute, private router:Router, public dialog: MatDialog, 
        private cache:CacheService, private paryerApi:PrayerService) {

    let userInfo = this.cache.getUser();
    if(userInfo==null)
    {
      this.router.navigate(['']);
      return;
    }

    this.state = this.cache.getPrayer();
    if(this.state==null)
    {
      this.router.navigate(['/buyseed']);
      return;
    }

    this.detail = {
      bkg_img:"../../../assets/img/demo/class2/bkg.png",
      images:[
        "../../../assets/img/demo/class2/0.png",
        "../../../assets/img/demo/class2/1.png",
        "../../../assets/img/demo/class2/2.png",
        "../../../assets/img/demo/class2/3.png",
        "../../../assets/img/demo/class2/4.png",
        "../../../assets/img/demo/class2/5.png",
      ]
    }    

  }

  ngOnInit() {    
    this.percent = 100 * this.state.step / 6;
    this.percentStep = 100 / 6;
    this.payingStep = this.state.step;
    this.prayer = this.state.prayer;
    this.full_grown = this.state.full_grown;
    this.refresh();

    this.loadStripe();
  }

  loadStripe() {      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

  refresh()
  {
    jQuery('#img_step').attr("src",  this.detail.images[this.payingStep-1]);
    jQuery('#paying_step').css("width",  this.percent + "%");
  }


  pay(amount) {    
    let svc = this;
    var handler = (<any>window).StripeCheckout.configure({
        //key: 'pk_test_96Woa6B83OShaLqWWWTLykzW',
        key:"pk_live_HtjQzmZiL9636ykM6bgBuG7w",
        locale: 'auto',
        token: function (token: any) {
        // // You can access the token ID with `token.id`.
        // // Get the token ID to your server-side code for use.
        // console.log(token)
        // alert('Token Created!!');
            svc.confirm();
        }
    });
    
    // <a href="">By Signing Up, You agree to the Terms and Privacy Policy</a>
    handler.open({
        name: 'MiracleOfJesus.com',
        description: '$5.00 for growing',
        amount: amount * 100
    });    
  }

  confirm()
  {
    let svc = this;
    let bible = this.praySays[this.iActivePraysayItem];
    this.paryerApi.grow(this.cache.getToken(), this.state.Id, bible).then(res=>{
      if(res !=null)
      {
        svc.payingSay = bible;
        svc.payingStep = res.step;
        svc.percent = res.step * 100 / 6;
        svc.refresh();     
        if(svc.payingStep >=6) {
          svc.full_grown = true;
        }  
      }
    });
  }

  onDonated()
  {
    if(this.payingStep >=this.detail.images.length) {
      this.full_grown = true;
      return;
    }
    this.pay(5);
  }

  onSelectPrayer(i)
  {
    if(this.payingStep >=this.detail.images.length) {
      return;
    }

    this.iActivePraysayItem = i;
    const dialogRef = this.dialog.open(PaygrowComponent, {
      width: '480px',
      data: {bibleSay:this.praySays[i], yes:false}
    });

    let svc = this;
    dialogRef.afterClosed().subscribe(result => {
      if(result==true)
        svc.onDonated();
    });
  }

}
