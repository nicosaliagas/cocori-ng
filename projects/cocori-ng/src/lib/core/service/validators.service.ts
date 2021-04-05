import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { HelperService } from './helper/helper.service';

// import { DateFunctions } from '../helper/date.function';
export interface ValidtionError {
    key: string;
    value?: any;
    message?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ValidatorsService {

    public getValidationErrorMessage(error: ValidtionError): any {

        const configClésErreurs: any = {
            'required': (!error.message ? 'Veuillez saisir ce champ' : error.message),
            'invalidEmailAddress': 'L\'e-mail n\'est pas valide.',
            'invalidCodePostal': 'Le code postal n\'est pas valide.',
            'invalidDate': "La date n'est pas valide.",
            'invalidHeure': "L'heure n'est pas au bon format.",
            'invalideDateHeure': "La date/heure n'est pas valide.",
            'regexInvalide': (!error.value.formatRegexEnClair ? 'Le format attendu est incorrect.' : `Fomat attendu : ${error.value.formatRegexEnClair}.`),
            'invalidTypeMime': "Le type du document n'est pas accepté.",
            'invalidTailleTotaleUpload': `La taille totale des pièces jointes est atteinte.`,
            'invalidTailleUpload': `La taille limite de la pièce jointe est atteinte.`,
            'datePasseeInvalide': "La date doit être dans le passé.",
            'dateFutureInvalide': "La date doit être dans le future.",
            'datePasseeOuPresenteInvalide': "La date doit être passée ou présente.",
            'dateFutureOuPresenteInvalide': "La date doit être présente ou future.",
            'invalidIMEI': "Le numéro IMEI est invalide.",
            'invalidDateAnterieure': "La date doit être antérieure.",
            'dateAvantUneAutre': "La date B doit être antérieure à la date A.",
            'invalidNumeroTelephone': 'Le numéro de téléphone n\'est pas valide.',
            'adresseMailDejaUtilisee': 'L\'adresse e-mail est déjà utilisée.',
            'identiqueValidator': 'Le champ n\'est pas identique.',
            'pseudoDejaUtilisee': 'Le pseudo est déjà utilisé.',
            'utilisateurMajeurInvalide': 'Vous devez être majeur.',
            'entierInvalide': 'Saisissez un entier.',
            'auMoinsUnChampRequis': 'Veuillez saisir au moins un critère de recherche.'
        };

        return configClésErreurs[error.key];
    }

    public static require(control: FormControl): any {
        return HelperService.retourneNullSiNonDéfini(control.value) === null ? { "required": true } : null;
    }

    public static emailValidator(control: FormControl): any {
        if (!control.value) return null;

        // RFC 2822 compliant regex
        if (control.value.match(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    public static telephoneValidator(control: FormControl): any {
        if (!control.value) return null;

        if (control.value.match(/^0[1-9](\s[0-9][0-9]){4}$/)) {
            return null;
        } else {
            return { 'invalidNumeroTelephone': true };
        }
    }

    public static codepostalValidator(control: FormControl): any {
        if (!control.value) return null;

        if (control.value.match(/^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/)) {
            return null;
        } else {
            return { 'invalidCodePostal': true };
        }
    }

    /** VALIDATEURS DATES */

    /**
     * La date à valider est au format string : jj/mm/aaaa
     */
    // public static dateValidateur(control: FormControl): any {
    //     if (!control.value) return null;

    //     const str = control.value;

    //     const dateValide: boolean = DateFunctions.validerDateJJMMAAAA(str);

    //     return dateValide ? null : { 'invalidDate': true };
    // }

    /**
     * La date à valider est au format UTC : 1982-11-06T00:00:00Z
     */
    // public static dateValidateurUTC(control: FormControl): any {
    //     if (!control.value) return null;

    //     const str = control.value;

    //     const dateValide: boolean = DateFunctions.validerDateUTC(str);

    //     return dateValide ? null : { 'invalidDate': true };
    // }

    // l'heure est au format 11h12
    // public static heureValidateur(control: FormControl): any {
    //     if (!control.value) return null;

    //     const str = control.value;

    //     if (DateFunctions.validerUneHeure(str)) {
    //         return null;
    //     } else {
    //         return { 'invalidHeure': true };
    //     }
    // }

    // la date heure est au format 01/01/2018 à 12h14
    // public static dateHeureValidateur(control: FormControl): any {
    //     if (!control.value) return null;

    //     const str: string = control.value;

    //     const valeurSplit: string[] = str.split(configdefault.date.dateTimeSeparator);

    //     const dateValide: boolean = DateFunctions.validerDateJJMMAAAA(valeurSplit[0]);
    //     const heureValide: boolean = DateFunctions.validerUneHeure(valeurSplit[1]);

    //     if (!dateValide) {
    //         return { 'invalidDate': true };
    //     } else if (!heureValide) {
    //         return { 'invalidHeure': true };
    //     } else {
    //         return null;
    //     }
    // }

    /**
     * La date à valider est au format UTC : 1982-11-06T15:15:15Z
     * invalideDateHeure
     */
    // public static dateHeureValidateurUTC(control: FormControl): any {
    //     if (!control.value) return null;

    //     const str = control.value;

    //     const dateValide: boolean = DateFunctions.validerDateUTC(str);

    //     return dateValide ? null : { 'invalideDateHeure': true };

    // }

    // public static datePasséeValidateur(control: FormControl): any {
    //     if (!control.value) return null;

    //     const dates: Date[] = DateFunctions.validateurDatesAides(control.value);

    //     if (dates[0] >= dates[1]) {
    //         return {
    //             'datePasseeInvalide': true
    //         };
    //     }

    //     return null;
    // }

    // public static dateFutureValidateur(control: FormControl): any {
    //     if (!control.value) return null;

    //     const dates: Date[] = DateFunctions.validateurDatesAides(control.value);

    //     if (dates[0] <= dates[1]) {
    //         return {
    //             'dateFutureInvalide': true
    //         };
    //     }

    //     return null;
    // }

    // public static datePasséeOuPrésenteValidateur(control: FormControl): any {
    //     if (!control.value) return null;

    //     const dates: Date[] = DateFunctions.validateurDatesAides(control.value);

    //     if (dates[0] > dates[1]) {
    //         return {
    //             'datePasseeOuPresenteInvalide': true
    //         };
    //     }

    //     return null;
    // }

    // public static dateFutureOuPrésenteValidateur(control: FormControl): any {
    //     if (!control.value) return null;

    //     const dates: Date[] = DateFunctions.validateurDatesAides(control.value);

    //     if (dates[0] < dates[1]) {
    //         return {
    //             'dateFutureOuPresenteInvalide': true
    //         };
    //     }

    //     return null;
    // }

    /** / VALIDATEURS DATES */

    // https://medium.com/front-end-hacking/reactive-forms-and-form-validation-with-angular-fdcbcf98e1e8
    public static regexValidator(regle: string, formatRegexEnClair: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) return null;

            const regexp: RegExp = new RegExp(regle);

            return !regexp.test(control.value) ? { 'regexInvalide': { formatRegexEnClair } } : null;
        };
    }

    public static numeroSinistreValidator(control: FormControl): any {
        if (!control.value) return null;

        if (control.value.match(/^([A-z0-9]{2})?(L|l)[A-z0-9](T|t)[A-z0-9]{5}$/)) {
            return null;
        } else {
            return { 'invalidNumeroSinistre': true };
        }
    }

    public static caseACocherRequireValidator(control: FormControl): any {
        if (control.value === true) {
            return null;
        } else {
            return { 'required': true };
        }
    }

    public static dateAvantUneAutre(champDateAvant: string, champDateAprès: string): any {
        return (group: FormGroup): { [key: string]: any } => {

            if (!group.get(champDateAvant) || !group.get(champDateAprès)) return null;

            const dateDébut: any = group.get(champDateAvant).value;
            const dateFin: any = group.get(champDateAprès).value;

            if (dateDébut > dateFin) {
                return {
                    'erreurDateFinAvantDébut': true
                };
            }

            return null;
        };
    }

    // https://gist.github.com/DiegoSalazar/4075533
    public static luhnValidator(control: FormControl): any {
        let valeur: string = control.value;

        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(valeur)) return { 'invalidIMEI': true };

        // The Luhn Algorithm. It's so pretty.
        let nCheck = 0;
        let nDigit: number = 0;
        let bEven: boolean = false;

        valeur = valeur.replace(/\D/g, "");

        for (let n = valeur.length - 1; n >= 0; n--) {
            const cDigit = valeur.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        if (nCheck % 10 === 0) {
            return null;
        } else {
            return { 'invalidIMEI': true };
        }
    }

    public static identiqueValidator(controle: string, controleConfirme: string): any {
        return (group: FormGroup): { [key: string]: any } => {
            const password = group.controls[controle];
            const confirmPassword = group.controls[controleConfirme];

            if (password.value !== confirmPassword.value) {
                return {
                    'identiqueValidator': true
                };
            }
        };
    }

    public static êtreMajeurValidateur(control: FormControl): any {
        if (parseInt(control.value) >= 18) {
            return null;
        } else {
            return { 'utilisateurMajeurInvalide': true };
        }
    }

    public static entierValidateur(control: FormControl): any {
        if (control.value.match(/^\d+$/)) {
            return null;
        } else {
            return { 'entierInvalide': true };
        }
    }

    public static auMoinsUnChampDoitEtreRequisValidateur(): any {
        return (group: FormGroup): { [key: string]: any } => {
            let isAtLeastOne = false;

            if (group && group.controls) {
                for (const control in group.controls) {
                    if (group.controls.hasOwnProperty(control) && group.controls[control].valid && HelperService.retourneNullSiNonDéfini(group.controls[control].value)) {
                        isAtLeastOne = true;
                        break;
                    }
                }
            }
            return isAtLeastOne ? null : { 'auMoinsUnChampRequis': true };
        };
    }
}
