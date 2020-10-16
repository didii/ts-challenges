export interface PersonDto {
    id: number;
    firstName: string;
    lastName: string;
    noseShape: string;
    hairColor: ColorDto;
    eyesColor: [ColorDto, ColorDto];
}

export interface Person {
    id: number;
    fullName: string;
    nose: string;
    hair: Color;
    eyes: [Color, Color];
}

export interface ColorDto {
    red: number;
    green: number;
    blue: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}