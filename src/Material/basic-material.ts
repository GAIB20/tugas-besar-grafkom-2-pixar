import { Material } from "./material.ts";
import { Color } from "../Math/color.ts";
import { MaterialTypes } from "../Types/material-types.ts";
import { ProgramInfo } from "../WebGL/program-info.ts";
import { TextureTypes } from "../Types/texture-types.ts";
import { IBasicMaterial } from "../Utils/model-interface.ts";

export class BasicMaterial extends Material {
    protected u_diffuseColor: Color;
    protected diffuseTextureType: TextureTypes;

    constructor(
        u_diffuseColor: Color = Color.GREEN,
        textureType: TextureTypes = TextureTypes.DIFFUSE_2
    ) {
        super();
        this._materialType = MaterialTypes.BASIC;
        this.u_diffuseColor = u_diffuseColor;
        this.diffuseTextureType = textureType;
    }

    public getDiffuseColor(): Color {
        return this.u_diffuseColor;
    }

    public setDiffuseColorFromRGB(r: number, g: number, b: number) {
        this.u_diffuseColor.setFromRGB(r, g, b);
    }

    override setUniforms(
        programInfo: ProgramInfo,
        textures: WebGLTexture[]
    ): void {
        programInfo.setUniforms({
            u_diffuseColor: this.u_diffuseColor.get(),
            u_diffuseTexture: textures[this.diffuseTextureType],
        });
    }

    public setDiffuseTextureType(textureType: TextureTypes) {
        if (
            textureType < TextureTypes.DIFFUSE_0 ||
            textureType > TextureTypes.DIFFUSE_3
        ) {
            throw new Error("Invalid texture type");
        }
        this.diffuseTextureType = textureType;
    }

    public toRaw(): IBasicMaterial {
        return {
            type: MaterialTypes.BASIC,
            u_diffuseColor: this.u_diffuseColor.get(),
            diffuseTextureType: this.diffuseTextureType,
        };
    }
    public static fromRaw(raw: IBasicMaterial): BasicMaterial {
        return new BasicMaterial(
            new Color(raw.u_diffuseColor[0], raw.u_diffuseColor[1], raw.u_diffuseColor[2]),
            raw.diffuseTextureType
        )
    }
}
