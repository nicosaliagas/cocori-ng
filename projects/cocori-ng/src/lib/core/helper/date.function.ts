import * as moment_ from 'moment';

import { configdefault } from '../../config/config.components';

const moment = moment_;

export class DateFunctions {

    constructor() { }

    private static timezoneOffsetInHours(date) {
        return date.getTimezoneOffset() / 60;
    }

    public static annéeCourante(): number {
        const dateJour: Date = new Date();

        return dateJour.getFullYear();
    }

    public static siècleCourante(): number {
        const annéeCourante: number = this.annéeCourante();

        return Math.trunc(annéeCourante / 100);
    }

    public static annéeCouranteSansLeSiècle(): number {
        const annéeCourante: number = this.annéeCourante();

        return annéeCourante % 100;
    }

    /**
     * Retourne la date au format AAAAMMJJ
     * @param dateAFormater date au format date JS
     */
    public static formaterVersDateAAAMMJJ(dateAFormater: Date): string {
        if (dateAFormater == null) {
            return null;
        }
        const date: Date = new Date(dateAFormater);

        return this.pad(date.getFullYear(), 4) + this.pad(date.getMonth() + 1, 2) + this.pad(date.getDate(), 2);
    }

    /**
     * Le back renvoie au front une date UTC au format string, ex : 2019-03-01T15:52:21.585Z
     * On renvoie la même date UTC au format Date
     * @param dateUTC
     */
    public static encoderDateUTCStringVersDate(dateUTC: string) {
        const valeurDate: Date = DateFunctions.convertirAuFormatDateUneDateEnClair(DateFunctions.formaterUneDateHeureGMT(dateUTC));
        return DateFunctions.formaterEnDateUTC(valeurDate);
    }

    public static formaterEnDateUTC(dateUTC: any): Date {
        if (dateUTC == null) return null;

        const dateAFormater: Date = new Date(dateUTC);

        const année: number = dateAFormater.getFullYear();
        const mois: number = dateAFormater.getMonth();
        const jour: number = dateAFormater.getDate();
        const heure: number = dateAFormater.getHours();
        const minute: number = dateAFormater.getMinutes();

        const dateARetourner = new Date(Date.UTC(année, mois, jour, heure, minute));

        /** prise en compte des dates erronnées venant de CAP */
        if (dateARetourner.getFullYear() === 1901 && dateARetourner.getMonth() === 0) {
            // return new Date(Date.UTC(1901, 0, 1, 0, 0, 0, 0)); // hack verrue CAP
            return null; // hack verrue CAP
        } else {
            return dateARetourner;
        }
    }

    public static dateUTCVersChaineISO(chaine: string): string {
        let dateISO: string = null;

        try {
            dateISO = DateFunctions.formaterEnDateUTC(chaine).toISOString();
        } catch (err) { } finally {
            return dateISO;
        }
    }

    /**
     * @param dateHeureAFormater au format 30/01/2018 à 16h42
     */
    public static formaterUneDateHeure(dateHeureAFormater): string {
        if (!dateHeureAFormater) return null;

        return moment(dateHeureAFormater).format(`DD/MM/YYYY${configdefault.date.dateTimeSeparator}HH:mm`);
        // return valeur.replace(':', 'h');
    }

    /**
    * Retourne la date au format JJ/MM/AAAA
    * @param dateAFormater date au format date JS
    */
    public static formaterVersDateJJMMAAAA(dateAFormater: Date): string {
        if (dateAFormater == null) {
            return null;
        }
        const date: Date = new Date(dateAFormater);

        return this.pad(date.getDate(), 2) + "/" + this.pad(date.getMonth() + 1, 2) + "/" + this.pad(date.getFullYear(), 4);
    }

    public static formaterUneDateHeureGMT(dateHeureAFormater): string {
        if (dateHeureAFormater == null) {
            return null;
        }

        const date: Date = new Date(dateHeureAFormater);

        const décalageHoraire = this.timezoneOffsetInHours(date);

        const dateFormatée: string = this.pad(date.getDate(), 2) + "/" + this.pad(date.getMonth() + 1, 2) + "/" + this.pad(date.getFullYear(), 4);
        const heureFormatée: string = this.pad(date.getHours() + décalageHoraire, 2) + ":" + this.pad(date.getMinutes(), 2);

        return dateFormatée + configdefault.date.dateTimeSeparator + heureFormatée;
    }

    public static pad(nombre, size = 2) {
        let s = nombre + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    // 60+1 = 1, 0-1 = 59
    public static operationHeureCyclique(valeurInitiale: number, operande: number, cycle: number): number {
        return (((valeurInitiale + operande) > 0) ? (valeurInitiale + operande) % cycle : (cycle - 1));
    }

    // format : 01/01/2017 à 12h10
    public static convertirAuFormatDateUneDateHeureEnClair(dateEnClair: string, heureEnClair: string): Date {
        const partieDate: Date = this.convertirAuFormatDateUneDateEnClair(dateEnClair);

        if (!partieDate) return null;

        const décalageHoraire = this.timezoneOffsetInHours(partieDate);
        const aDataEnClair = dateEnClair.split("/");
        const aHeureEnClair = heureEnClair.split(":");

        // ----------

        const heure: number = parseInt(aHeureEnClair[0]);
        const minute: number = parseInt(aHeureEnClair[1]);

        if (heure > 23 || minute > 59) {
            return null;
        }

        // ----------

        const dateARetourner: Date = new Date(Date.UTC(parseInt(aDataEnClair[2]), parseInt(aDataEnClair[1]) - 1, parseInt(aDataEnClair[0]), heure + décalageHoraire, minute));

        return dateARetourner;
    }

    public static convertirAuFormatDateUneDateEnClair(dateEnClair: string): Date {
        if (dateEnClair == null) {
            return null;
        }

        const estceUneDateHeure = dateEnClair.split(configdefault.date.dateTimeSeparator);

        if (estceUneDateHeure.length > 1) {
            return this.convertirAuFormatDateUneDateHeureEnClair(estceUneDateHeure[0], estceUneDateHeure[1]);
        }

        const aDataEnClair = dateEnClair.split("/");

        // ----------

        const année: number = parseInt(aDataEnClair[2]);
        const mois: number = parseInt(aDataEnClair[1]);
        const jour: number = parseInt(aDataEnClair[0]);

        const validerDate = `${année}/${this.pad(mois)}/${jour}`;

        if (new Date(validerDate).toString() === 'Invalid Date') {
            return null;
        }

        // ----------

        const date: Date = new Date(Date.UTC(année, mois - 1, jour));
        // const décalageHoraire = this.timezoneOffsetInHours(date);
        // const dateARetourner: Date = new Date(année, mois - 1, jour, date.getHours() + décalageHoraire, date.getMinutes());

        return date;
    }

    /**
     * Retourne au format string une date en clair convertie au format UTC
     * @param dateEnClair au format jj/mm/aaaa à HHhmm
     * ex : 15/01/2019 à 15h11
     * //// formaterEnDateUTC
     */
    public static formateUneDateEnClairEnUTC(dateEnClair: any): string {
        if (!dateEnClair) return null;

        const date: Date = DateFunctions.convertirAuFormatDateUneDateEnClair(dateEnClair);

        if (!date) return null;

        return moment(date).utc().format();
    }

    /**
     *
     * @param dateAValider : date string mais au format UTC
     */
    public static validateurDatesAides(dateAValider: string): Date[] {
        const dateAValiderUTC: Date = DateFunctions.formaterEnDateUTC(dateAValider);
        const dateJourUTC: Date = DateFunctions.formaterEnDateUTC(new Date());

        dateAValiderUTC.setHours(0, 0, 0, 0);
        dateJourUTC.setHours(0, 0, 0, 0);

        dateAValiderUTC.setSeconds(0);
        dateJourUTC.setSeconds(0, 0);

        return [dateAValiderUTC, dateJourUTC];
    }

    /** Les Heures  */

    // 12h34 -> 12:34
    // public static formaterHeureEnClair(valeur: string): string {
    //     return valeur.replace('h', ':');
    // }

    // public static formaterHeureBack(valeur: string): string {
    //     return valeur.replace(':', 'h');
    // }

    // retour : vendredi 22 novembre à 07:43
    public static encodeDateHeureVersDateHeureLisible(valeurAFormater: any) {
        return moment(valeurAFormater).utc().format("dddd DD MMMM à hh:mm");
    }

    /**
     *
     * @param dateAValider: la date doit être au format jj/mm/aaaa
     */
    public static validerDateJJMMAAAA(dateAValider: string): boolean {
        const m = dateAValider.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
            , d = (m) ? new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1])) : null
            , matchesPadded = (d && (dateAValider === [DateFunctions.pad(d.getDate()), DateFunctions.pad(d.getMonth() + 1), d.getFullYear()].join('/')))
            , matchesNonPadded = (d && (dateAValider === [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/')));

        if (!matchesPadded && !matchesNonPadded) {
            return false;
        }

        return matchesPadded || matchesNonPadded;
    }

    /**
     *
     * @param dateAValider: la date doit être au format UTC 1982-11-06T00:00:00Z
     */
    public static validerDateUTC(dateAValider: string): boolean {
        const dateAValiderUTC: Date = DateFunctions.formaterEnDateUTC(dateAValider);

        if (dateAValiderUTC && !isNaN(dateAValiderUTC.getTime())) {
            return true;
        } else {
            return false;
        }
    }

    public static dateUTCEgalité(dateA: string, dateB: string): boolean {
        const dateAUTC: Date = DateFunctions.formaterEnDateUTC(dateA);
        const dateBUTC: Date = DateFunctions.formaterEnDateUTC(dateB);

        dateAUTC.setHours(0, 0, 0, 0);
        dateBUTC.setHours(0, 0, 0, 0);

        dateAUTC.setSeconds(0);
        dateBUTC.setSeconds(0, 0);

        return dateAUTC === dateBUTC;
    }

    public static validerUneHeure(valeur: string): boolean {
        // const val: string = this.formaterHeureEnClair(valeur);
        if (valeur.match(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Retourne en minute la différence entre 2 dates
     * @param date1
     * @param date2
     */
    public static différenceDatesEnMinute(date1S: any, date2S: any): number {
        const date1M = moment(date1S);
        const date2M = moment(date2S);

        if (date1M < date2M) return 0;

        const duration = moment.duration(date1M.diff(date2M));

        return duration.asMinutes();
    }

    public static différenceDatesEnMinuteFormatHHMM(date1S: any, date2S: any): string {
        const date1M = moment(date1S);
        const date2M = moment(date2S);

        if (date1M < date2M) return null;

        const duration = moment.duration(date1M.diff(date2M), 'minutes');
        const format: string = moment.utc(duration.asMinutes()).format('HH:mm');

        return format;
    }

    public static ajouterMinutesDate(dateUTC: any, minutes: number): string {
        return moment.utc(dateUTC).add(minutes, 'minutes').format();
    }


    public static ajouterHeuresMinutesDate(dateUTC: any, temps: string): string {
        return DateFunctions.ajouterMinutesDate(dateUTC, moment.duration(temps).asMinutes());
    }

}
