// import Guid from 'devextreme/core/guid';

export class HelperFunctions {

    static retourneNomDeDomaine(): string {
        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    }

    static enleverNomDomaineUrl(url: string): string {
        if (!url) return null;

        if (!/^http[s]?:\/\//.test(url)) return url;

        const urlSansHttp: string[] = url.split(/^http[s]?:\/\//);

        const indexSlash: number = urlSansHttp[1].indexOf("/");

        const urlValide: string = urlSansHttp[1].substring(indexSlash);

        return urlValide;
    }

    static retourneSegmentsURL(): string[] {
        const pathName: string = window.location.pathname;
        // on supprime du pathname le dernier caractères s'il s'agit d'un /
        return pathName.replace(/\/$/, '').split('/');
    }

    static ouvrirUrlExterne(lien: string, estceNouvelOnglet: boolean = false) {
        if (!this.retourneNullSiNonDéfini(lien)) return;

        let url: string = '';
        if (!/^http[s]?:\/\//.test(lien)) {
            url += 'http://';
        }

        url += lien;

        if (estceNouvelOnglet) {
            window.open(url);
        } else {
            window.location.href = url;
        }
    }

    static nettoyerParametresUrl(ancienneUrl: string): string {
        let index = 0;
        let nouvelleUrl = ancienneUrl;
        index = ancienneUrl.indexOf('?');

        if (index === -1) {
            index = ancienneUrl.indexOf('#');
        }
        if (index !== -1) {
            nouvelleUrl = ancienneUrl.substring(0, index);
        }

        return nouvelleUrl;
    }

    static construireUrl(url: string): string {
        return this.retourneNomDeDomaine() + '/' + url;
    }

    static segmentsURL(url: string): string[] {
        if (!url) return [];
        // on supprime de l'url le 1er / et le de dernier /
        return url.replace(/\/*/, '').replace(/\/$/, '').split('/');
    }


    static estceUrlValide(string) {
        const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (!res) {
            return false;
        } else {
            return true;
        }
    }

    static encoderParamètresUrl(data): string {
        const ret = [];

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];

                ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(element));
            }
        }

        return ret.join('&');
    }

    static concaténerParamètresUrl(url: string, paramètres: string): string {
        return url + '?' + paramètres;
    }

    static ajouterParamètreUrl(url: string, param: string, value?: string): string {
        const a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
        let match = null;
        const str = []; a.href = url; param = encodeURIComponent(param);

        while (match = regex.exec(a.search)) {
            if (param !== match[1]) str.push(match[1] + (match[2] ? "=" + match[2] : ""));
        }

        str.push(param + (value ? "=" + encodeURIComponent(value) : ""));
        a.search = str.join("&");
        return a.href;
    }

    /**
     * Retourne l'url courante sans les paramètres
     */
    static donneUrlCouranteSansParamètre(): string {
        return window.location.href.split(/[?#]/)[0];
    }

    /**
     * JavaScript Get URL Parameter
     * @param String prop The specific URL parameter you want to retreive the value for
     * @return String|Object If prop is provided a string value is returned, otherwise an object of all properties is returned
     */
    static donneParamètresUrl(prop?: string, urlStatique?: string): string | object {
        const params = {};
        const urlCourante = urlStatique ? urlStatique : window.location.href;
        const search = decodeURIComponent(urlCourante.slice(urlCourante.indexOf('?') + 1));

        if (search === urlCourante) return null;

        const definitions = search.split('&');

        definitions.forEach(function (val, key) {
            const parts = val.split('=', 2);
            params[parts[0]] = parts[1];
        });

        if ((prop && !(prop in params))) {
            return null;
        }

        return (prop && prop in params) ? params[prop] : params;
    }


    static retourneParamètresAccolades(url: string): string[] {
        if (!this.retourneNullSiNonDéfini(url)) {
            return [];
        }

        const résultat: string[] = url.match(/\{(.*?)\}/g); // entre {}

        return !résultat ? [] : résultat;
    }

    /** efface les paramètres entre accolades d'une chaîne */
    static effacerParamètresAccolades(chaine: string): string {
        return this.éviterDoubleSlash(this.remplacerToutesOccurences(chaine, /\{(.*?)\}/g, ""));
    }

    static remplacerParamètresAccolades(chercherDans: string, motif: string, valeur: string): string {
        return HelperFunctions.remplacerToutesOccurences(chercherDans, `{${motif}}`, valeur);
    }

    static estceObjetVide(objet: any) {
        return Object.keys(objet).length === 0 && objet.constructor === Object;
    }

    /**
     * Détection de savoir s'il l'on vient d'une nouvelle page ou d'une page du site
     */
    static pageOuverteDepuisScript(): boolean {
        return window.opener !== null;
    }

    static éviterDoubleSlash(chaine: string): string {
        return HelperFunctions.remplacerToutesOccurences(chaine, /(https?:\/\/)|(\/){2,}/g, "$1$2");
    }

    /**
     * Vérifie s'il existe une concordance entre les `paramètres de l'url courante` et les `paramètres de la source de données`
     * @param urlSourceDonnées : exemple : la source de données d'une page de type formulaire, http://api.sonate-dev.fr:85/tiers/individus/{id}
     * @param urlCouranteStatique : l'url du navigateur, http://localhost:1200/page/lab-formulaire?id=016247a2-2c1c-4e08-bd78-9b05659ec5ee
     */
    static siConcordanceParamètresURLetSourceDonnées(urlSourceDonnées: string, urlCouranteStatique?: string): boolean {
        if (!urlSourceDonnées) return null;

        const urlCourante = urlCouranteStatique ? urlCouranteStatique : window.location.search;
        const paramètresAccolades: string[] = this.retourneParamètresAccolades(urlSourceDonnées);

        if (!paramètresAccolades.length) {
            return false;
        }

        for (let index = 0; index < paramètresAccolades.length; index++) {
            const paramètreAvecAccolades = paramètresAccolades[index];
            const paramètreSansAccolade: string = paramètreAvecAccolades.substring(paramètreAvecAccolades.lastIndexOf("{") + 1, paramètreAvecAccolades.lastIndexOf("}"));
            const valeurParamètre: string | object = this.donneParamètresUrl(paramètreSansAccolade, urlCourante);

            if (!valeurParamètre) {
                return false;
            }
        }
        return true;
    }

    static retourneNullSiNonDéfini(valeur: any) {
        if (Array.isArray(valeur)) {
            valeur = valeur.length === 0 ? null : valeur;
        } else if (typeof valeur === 'number') {
            return valeur;
        } else {
            valeur = typeof valeur === "string" ? valeur.trim() : valeur;
        }
        return !valeur ? null : valeur;
    }

    static remplacerToutesOccurences(chaine, motif, remplacerPar): string {
        return chaine.replace(new RegExp(motif, 'g'), remplacerPar);
    }

    static valeurTexteBooléen(valeur: boolean): string {
        if (typeof (valeur) === "boolean") {
            return valeur ? "Oui" : "Non";
        }

        return null;
    }

    static estNumerique(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // 01 02 03 04 05 -> 0102030405
    static adapteurEcritureTelephone(valeurAvecEspace: string): string {
        let valeurSansEspace: string;

        if (!this.retourneNullSiNonDéfini(valeurAvecEspace)) {
            return null;
        }

        const tmp: string[] = valeurAvecEspace.split(' ');

        valeurSansEspace = tmp[0] + tmp[1] + tmp[2] + tmp[3] + tmp[4];
        return valeurSansEspace;
    }

    static retourneValeurObjet(objet: any, propriété: string) {
        if (typeof objet !== 'undefined' && objet.hasOwnProperty(propriété)) {
            return objet[propriété];
        }
        return null;
    }

    static dupliquerTableau(tableau: any[]): any[] {
        return [...tableau];
    }

    static ajouterValeurTableau(tableau: any[], valeur: any): any[] {
        return [...tableau, valeur];
    }

    static ajouterValeurUniqueTableau(tableau: any[], valeur: any): any[] {
        if (tableau.indexOf(valeur) === -1) {
            return [...tableau, valeur];
        }

        return tableau;
    }

    static retirerValeurTableau(tableau: any[], valeur: any): any[] {
        return this.retirerValeurTableauParIndex(tableau, tableau.indexOf(valeur));
    }

    static retirerValeurTableauParIndex(tableau: any[], index: number): any[] {
        if (index === -1) return tableau;
        return [...tableau.slice(0, index), ...tableau.slice(index + 1)];
    }

    static arrondirZeroCinqPrès(nombre: number): number {
        return Math.round(nombre * 2) * 0.5;
    }

    /**
     * Un GUID envoyé depuis le back au front est de la forme : (inheritor) {_value: "0163d59a-bcd8-44fe-852f-100af77dfb9b"}
     * @param objetInheritor objet GUID envoyé depuis le backoffice
     */
    static désérialiserInheritorGuid(objetInheritor: any): string {
        return objetInheritor._value ? objetInheritor._value : null;
    }

    static sérialiserInheritorGuid(valeur: any): object {
        return null
        // return valeur._value ? valeur : new Guid(valeur);
    }

    static estdetypeInheritorGuid(valeur: any): object {
        return valeur.hasOwnProperty("_value");
    }

    static estdetypeGuid(valeur: string): boolean {
        if (!valeur) return false;
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(valeur);
    }

    /** fin bloc GUID */

    static valeurDéfautBooléen(valeur: any): boolean {
        return (typeof valeur !== "undefined" && !valeur) ? false : true;
    }
}
