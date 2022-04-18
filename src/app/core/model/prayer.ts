export class PrayerDetail{
    bkg_img:any;
    images:any[] = [];
}

export class PrayerState{
    Id:number = 0;
    user_id:number = 0;
    prayer:string = '';
    step:number = 0;
    bible_1:string = '';
    bible_2:string = '';
    bible_3:string = '';
    bible_4:string = '';
    bible_5:string = '';
    registered_dt:string='';
    updated_dt:string='';

    full_grown:boolean = false;
    percent:number = 0;
    percentStyle:string = '';

}

