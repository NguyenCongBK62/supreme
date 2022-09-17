//     #region "For CCalcFunc"

/// <summary>
/// 楕円体パラメータの構造体
/// </summary>
export class EllipPar {
  /// <summary> semimajor axix in meter</summary>
  a: number
  /// <summary> reciprocal flattening</summary>
  f1: number
  /// <summary> flattening</summary>
  f: number
  /// <summary>squared eccentricity</summary>
  e: number

  /// <summary>
  /// SETTER
  /// </summary>
  /// <param name="ia">semimajor axix in meter</param>
  /// <param name="if1">reciprocal flattening</param>
  /// <param name="if2">flattening</param>
  /// <param name="ie">squared eccentricity</param>
  constructor(ia: number, if1: number, if2: number, ie: number) {
    this.a = ia
    this.f1 = if1
    this.f = if2
    this.e = ie
  }
}

///// <summary>
///// 座標変換パラメータ緯度差，経度差の構造体
///// </summary>
//internal struct TranPara
//{
//	/// <summary>緯度差</summary>
//	public double dB;
//	/// <summary>経度差</summary>
//	public double dL;
//}

/// <summary>
/// メッシュコードの構造体
/// </summary>
export class MeshCode {
  /// <summary>１次メッシュコード(4桁)</summary>
  /// <example>5438</example>
  MC1?: number
  /// <summary>２次メッシュコード(2桁)</summary>
  /// <example>23</example>
  MC2?: number
  /// <summary>３次メッシュコード(2桁)</summary>
  /// <example>45</example>
  MC3?: number
  /// <summary>すべて</summary>
  /// <example>54382345</example>
  MC123?: number
  /// <summary>正式な形式の文字列型</summary>
  /// <example>"5438-23-45"</example>
  MCs?: number
  /// <summary>余り。3次メッシの左下（南西角）点からどれくらいずれているか。</summary>
  /// <remarks>0(西端)以上1(東端)未満</remarks>
  ModLat?: number
  /// <summary>余り。3次メッシの左下（南西角）点からどれくらいずれているか。</summary>
  /// <remarks>0(南端)以上1(北端)未満</remarks>
  ModLon?: number
}

///// <summary>
///// 1行1ｸﾞﾘｯﾄﾞ型ﾃﾞｰﾀ変換ﾊﾟﾗﾒｰﾀを格納
///// </summary>
/////internal struct AreaParamData
//{
//	/// <summary>メッシュコード</summary>
//	public int MC;
//	/// <summary>緯度</summary>
//	public double dB1;
//	/// <summary>経度</summary>
//	public double dL1;
//}

// #endregion

/// <summary>
/// CCalcFunc の概要の説明です。
/// </summary>
export class CCalcFunc {
  private PI = 3.14159265358979
  private TWO_PI = 6.28318530717959
  private HAF_PI = 1.5707963267949
  private rad2deg = 57.2957795130823 // ラジアンを度にするため掛ける数
  private deg2rad = 1.74532925199433e-2 // 度をラジアンにするため掛ける数

  // 系毎のパラメータリスト
  // std::vector<AreaParamData>
  //	private ArrayList g_AreaParamList = null;

  // 楕円体ﾊﾟﾗﾒｰﾀの設定
  // EP[0]はBessel楕円体，EP[1]はGRS-80楕円体
  private EP: EllipPar[]

  // 平面直角座標系の原点の経緯度表
  private kei_tab: Array<number[]>

  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    //		g_AreaParamList = new ArrayList();

    this.EP = [
      new EllipPar(
        6377397.155,
        299.152813,
        1.0 / 299.152813,
        (2.0 * 299.152813 - 1.0) / 299.152813 / 299.152813
      ),
      new EllipPar(
        6378137.0,
        298.257222101,
        1.0 / 298.257222101,
        (2.0 * 298.257222101 - 1.0) / 298.257222101 / 298.257222101
      ),
    ]

    this.kei_tab = [
      [33.0, 129.5], // 第Ⅰ系
      [33.0, 131.0], // 第Ⅱ系
      [36.0, 132.0 + 10.0 / 60.0], // 第Ⅲ系
      [33.0, 133.5], // 第Ⅳ系
      [36.0, 134.0 + 20.0 / 60.0], // 第Ⅴ系
      [36.0, 136.0], // 第Ⅵ系
      [36.0, 137.0 + 10.0 / 60.0], // 第Ⅶ系
      [36.0, 138.5], // 第Ⅷ系
      [36.0, 139.0 + 50.0 / 60.0], // 第Ⅸ系
      [40.0, 140.0 + 50.0 / 60.0], // 第Ⅹ系
      [44.0, 140.0 + 15.0 / 60.0], // 第ⅩⅠ系
      [44.0, 142.0 + 15.0 / 60.0], // 第ⅩⅡ系
      [44.0, 144.0 + 15.0 / 60.0], // 第ⅩⅢ系
      [26.0, 142.0], // 第ⅩⅣ系
      [26.0, 127.5], // 第ⅩⅤ系
      [26.0, 124.0], // 第ⅩⅥ系
      [26.0, 131.0], // 第ⅩⅦ系
      [20.0, 136.0], // 第ⅩⅧ系
      [26.0, 154.0], // 第ⅩⅨ系
    ]
  }

  // 	/// <summary>
  // 	/// デスコンストラクタ
  // 	/// </summary>
  // 	~CCalcFunc()
  // 	{
  // //		g_AreaParamList.Clear();
  // //		g_AreaParamList = null;
  // 		EP = null;
  // 		kei_tab = null;
  // //		GC.Collect();
  // 	}

  // 	#region "METHOD"

  // 緯度経度を平面直角座標に換算 called by doCalcBl2xyFile
  // B0,L0	(I) 求点の緯度、経度(radian)
  // B1,L1	(I) 座標系原点の緯度、経度(radian)
  // M0		(I) 基準子午線の縮尺係数 ex.0.9999(X,Y), 0.9996(UTM)
  // EP		(I) 楕円体のパラメータ入り構造体
  // X		(O) 平面直角座標値，原点での北向き成分(meter)
  // Y		(O) 平面直角座標値，原点での東向き成分(meter)
  // Gamma	(O) 子午線収差角(radian),これのマイナスが真北方向角
  // MMM		(O) 縮尺係数
  private calcBl2xy(
    B0: number,
    L0: number,
    B1: number,
    L1: number,
    M0: number,
    EP: EllipPar
  ): [X: number, Y: number, Gamma: number, MMM: number] {
    // Ver.1.3  1999/10/19  (C) Mikio TOBITA 飛田幹男，国土地理院
    // 緯度,経度を平面直角座標X,Yに換算します。called by doCalcBl2xyFile
    // 「精密測地網一次基準点測量計算式」を導入し多くの項を採用。
    // 入力
    //   B,L   : 求点の緯度、経度(radian)
    //   B1,L1 : 座標系原点の緯度、経度(radian)
    //   M0    : 基準子午線の縮尺係数 ex.0.9999(X,Y), 0.9996(UTM)
    //   EP    : 楕円体のパラメータ入り構造体
    // 出力
    //   X     : 平面直角座標値，原点での北向き成分(meter)
    //   Y     : 平面直角座標値，原点での東向き成分(meter)
    //   Gamma : 子午線収差角(radian),これのマイナスが真北方向角
    //   MMM   : 縮尺係数

    let dL: number, DL2: number, DL4: number, DL6: number
    let AEE: number, CEE: number, Ep2: number
    let AJ: number, BJ: number, CJ: number, DJ: number, EJ: number
    let FJ: number, GJ: number, HJ: number, IJ: number
    let S0 = 0.0 // 赤道から座標系原点までの子午線長の計算
    let S = 0.0 // 赤道から求点までの子午線長の計算
    let COS2: number
    let Eta2phi: number, Mphi: number, Nphi: number // phi(=B)の関数
    let T: number, T2: number, T4: number, T6: number
    let e2: number, e4: number, e6: number, e8: number, e10: number
    let e12: number, e14: number, e16: number

    dL = L0 - L1 // Δλ

    e2 = EP.e
    e4 = e2 * e2
    e6 = e4 * e2
    e8 = e4 * e4
    e10 = e8 * e2
    e12 = e8 * e4
    e14 = e8 * e6
    e16 = e8 * e8

    // 定数項
    AEE = EP.a * (1.0 - EP.e) // a(1-e2)
    CEE = EP.a / Math.sqrt(1.0 - EP.e) // C=a*sqr(1+e'2)=a/sqr(1-e2)
    Ep2 = EP.e / (1.0 - EP.e) // e'2 (e prime 2) Eta2phiを計算するため

    // 「緯度を与えて赤道からの子午線弧長を求める計算」のための９つの係数を求める。
    // 「精密測地網一次基準点測量計算式」P55,P56より。係数チェック済み1999/10/19。
    AJ = (4927697775.0 / 7516192768.0) * e16
    AJ = AJ + (19324305.0 / 29360128.0) * e14
    AJ = AJ + (693693.0 / 1048576.0) * e12
    AJ = AJ + (43659.0 / 65536.0) * e10
    AJ = AJ + (11025.0 / 16384.0) * e8
    AJ = AJ + (175.0 / 256.0) * e6
    AJ = AJ + (45.0 / 64.0) * e4
    AJ = AJ + (3.0 / 4.0) * e2
    AJ = AJ + 1.0
    BJ = (547521975.0 / 469762048.0) * e16
    BJ = BJ + (135270135.0 / 117440512.0) * e14
    BJ = BJ + (297297.0 / 262144.0) * e12
    BJ = BJ + (72765.0 / 65536.0) * e10
    BJ = BJ + (2205.0 / 2048.0) * e8
    BJ = BJ + (525.0 / 512.0) * e6
    BJ = BJ + (15.0 / 16.0) * e4
    BJ = BJ + (3.0 / 4.0) * e2
    CJ = (766530765.0 / 939524096.0) * e16
    // CJ = CJ + 45090045.0 / 5870256.0 * e14 精密測地網一次基準点測量作業規定の誤りによるバグ
    CJ = CJ + (45090045.0 / 58720256.0) * e14
    CJ = CJ + (1486485.0 / 2097152.0) * e12
    CJ = CJ + (10395.0 / 16384.0) * e10
    CJ = CJ + (2205.0 / 4096.0) * e8
    CJ = CJ + (105.0 / 256.0) * e6
    CJ = CJ + (15.0 / 64.0) * e4
    DJ = (209053845.0 / 469762048.0) * e16
    DJ = DJ + (45090045.0 / 117440512.0) * e14
    DJ = DJ + (165165.0 / 524288.0) * e12
    DJ = DJ + (31185.0 / 131072.0) * e10
    DJ = DJ + (315.0 / 2048.0) * e8
    DJ = DJ + (35.0 / 512.0) * e6
    EJ = (348423075.0 / 1879048192.0) * e16
    EJ = EJ + (4099095.0 / 29360128.0) * e14
    EJ = EJ + (99099.0 / 1048576.0) * e12
    EJ = EJ + (3465.0 / 65536.0) * e10
    EJ = EJ + (315.0 / 16384.0) * e8
    FJ = (26801775.0 / 469762048.0) * e16
    FJ = FJ + (4099095.0 / 117440512.0) * e14
    FJ = FJ + (9009.0 / 524288.0) * e12
    FJ = FJ + (693.0 / 131072.0) * e10
    GJ = (11486475.0 / 939524096.0) * e16
    GJ = GJ + (315315.0 / 58720256.0) * e14
    GJ = GJ + (3003.0 / 2097152.0) * e12
    HJ = (765765.0 / 469762048.0) * e16
    HJ = HJ + (45045.0 / 117440512.0) * e14
    IJ = (765765.0 / 7516192768.0) * e16

    // 赤道から座標系原点までの子午線長の計算
    S0 = this.MeridS(B1, AEE, AJ, BJ, CJ, DJ, EJ, FJ, GJ, HJ, IJ)

    // 何度も使う式を変数に代入
    T = Math.tan(B0)
    T2 = T * T
    T4 = T2 * T2
    T6 = T4 * T2
    COS2 = Math.cos(B0) * Math.cos(B0)
    Eta2phi = Ep2 * COS2 // =η1*η1
    //Mphi = CEE / Math.Sqrt((1.0 + Eta2phi) ^ 3.0);	// 「精密測地網一次基準点測量計算式」P52のM(phi)
    Mphi = CEE / Math.sqrt(Math.pow(1.0 + Eta2phi, 3)) // 「精密測地網一次基準点測量計算式」P52のM(phi)
    Nphi = CEE / Math.sqrt(1.0 + Eta2phi) // 「精密測地網一次基準点測量計算式」P52のN(phi)
    DL2 = dL * dL
    DL4 = DL2 * DL2
    DL6 = DL4 * DL2

    // 赤道から求点までの子午線長の計算
    S = this.MeridS(B0, AEE, AJ, BJ, CJ, DJ, EJ, FJ, GJ, HJ, IJ)

    // Ｘ，Ｙの計算 in meter
    // 「精密測地網一次基準点測量計算式」P52,53のx,yを求める式より
    //X = -(-1385.0 + 3111.0 * T2 - 543.0 * T4 + T6) * DL6 * COS2 ^ 3.0 / 40320.0;
    let X = (-(-1385.0 + 3111.0 * T2 - 543.0 * T4 + T6) * DL6 * Math.pow(COS2, 3)) / 40320.0
    //X = X - (-61.0 + 58.0 * T2 - T4 - 270.0 * Eta2phi + 330.0 * T2 * Eta2phi) * DL4 * COS2 ^ 2.0 / 720.0;
    X =
      X -
      ((-61.0 + 58.0 * T2 - T4 - 270.0 * Eta2phi + 330.0 * T2 * Eta2phi) *
        DL4 *
        Math.pow(COS2, 2)) /
        720.0
    X = X + ((5.0 - T2 + 9.0 * Eta2phi + 4.0 * Eta2phi * Eta2phi) * DL2 * COS2) / 24.0
    X = X + 1.0 / 2.0
    X = X * Nphi * COS2 * T * DL2
    X = X + S - S0
    X = X * M0
    //Y = -(-61.0 + 479.0 * T2 - 179.0 * T4 + T6) * DL6 * COS2 ^ 3.0 / 5040.0;
    let Y = (-(-61.0 + 479.0 * T2 - 179.0 * T4 + T6) * DL6 * Math.pow(COS2, 3)) / 5040.0
    //Y = Y - (-5.0 + 18.0 * T2 - T4 - 14.0 * Eta2phi + 58.0 * T2 * Eta2phi) * DL4 * COS2 ^ 2.0 / 120.0;
    Y =
      Y -
      ((-5.0 + 18.0 * T2 - T4 - 14.0 * Eta2phi + 58.0 * T2 * Eta2phi) * DL4 * Math.pow(COS2, 2)) /
        120.0
    Y = Y - ((-1.0 + T2 - Eta2phi) * DL2 * COS2) / 6.0
    Y = Y + 1.0
    Y = Y * Nphi * Math.cos(B0) * dL
    Y = Y * M0

    // 子午線収差角　これのマイナスが真北方向角(rad)
    // 「精密測地網一次基準点測量計算式」P53のγを求める式より
    //Gamma = COS2 * COS2 * (2.0 - T2) * dL ^ 4.0 / 15.0;
    let Gamma = (COS2 * COS2 * (2.0 - T2) * Math.pow(dL, 4)) / 15.0
    //Gamma = Gamma + COS2 * (1.0 + 3.0 * Eta2phi + 2.0 * Eta2phi ^ 2.0) * dL ^ 2.0 / 3.0;
    Gamma =
      Gamma + (COS2 * (1.0 + 3.0 * Eta2phi + 2.0 * Math.pow(Eta2phi, 2)) * Math.pow(dL, 2)) / 3.0
    Gamma = Gamma + 1.0
    Gamma = Gamma * Math.cos(B0) * T * dL

    // 縮尺係数の計算 「精密測地網一次基準点測量計算式」P51のmを求める式より
    //MMM = Y ^ 4.0 / (24.0 * Mphi * Mphi * Nphi * Nphi * M0 ^ 4.0);
    let MMM = Math.pow(Y, 4) / (24.0 * Mphi * Mphi * Nphi * Nphi * Math.pow(M0, 4))
    //MMM = MMM + Y * Y / (2.0 * Mphi * Nphi * M0 ^ 2.0);
    MMM = MMM + (Y * Y) / (2.0 * Mphi * Nphi * Math.pow(M0, 2))
    MMM = MMM + 1.0
    MMM = MMM * M0

    return [X, Y, Gamma, MMM]
  }

  // 赤道から緯度Phiまでの子午線弧長を計算
  private MeridS(
    Phi: number,
    AEE: number,
    AJ: number,
    BJ: number,
    CJ: number,
    DJ: number,
    EJ: number,
    FJ: number,
    GJ: number,
    HJ: number,
    IJ: number
  ): number {
    // Ver.1.3  1999/10/19  (C) Mikio TOBITA 飛田幹男，国土地理院
    // 赤道から緯度Phiまでの子午線弧長を計算します。
    //「精密測地網一次基準点測量計算式」P55より
    let SS = (IJ / 16.0) * Math.sin(16.0 * Phi)
    SS = SS - (HJ / 14.0) * Math.sin(14.0 * Phi)
    SS = SS + (GJ / 12.0) * Math.sin(12.0 * Phi)
    SS = SS - (FJ / 10.0) * Math.sin(10.0 * Phi)
    SS = SS + (EJ / 8.0) * Math.sin(8.0 * Phi)
    SS = SS - (DJ / 6.0) * Math.sin(6.0 * Phi)
    SS = SS + (CJ / 4.0) * Math.sin(4.0 * Phi)
    SS = SS - (BJ / 2.0) * Math.sin(2.0 * Phi)
    SS = SS + AJ * Phi
    SS = AEE * SS
    return SS
  }

  // 「3ﾊﾟﾗﾒｰﾀによる」Tokyo97系からITRF94系への座標変換
  private Tokyo97toITRF94(B1: number, L1: number): [B2: number, L2: number] {
    // Ver.1.1  1999/1/28  (C) Mikio TOBITA 飛田幹男，国土地理院
    // 「3ﾊﾟﾗﾒｰﾀによる」Tokyo97系からITRF94系への座標変換を行う。
    //  この変換では楕円体高Hはゼロとする。
    // by 飛田幹男
    // 入力　B1    : 緯度(度)
    // 　　　L1    : 経度(度)
    // 出力　B2    : 緯度(度)
    // 　　　L2    : 経度(度)
    let Brad: number, ALrad: number // 緯度，経度(radian)
    let H = 0.0 // 楕円体高(m)
    let X1 = 0.0,
      Y1 = 0.0,
      Z1 = 0.0,
      X2 = 0.0,
      Y2 = 0.0,
      Z2 = 0.0 // (m)

    Brad = B1 * this.deg2rad
    ALrad = L1 * this.deg2rad

    // 緯度，経度から三次元直交座標系(X,Y,Z)への換算
    ;[X1, Y1, Z1] = this.BLHXYZcalc(Brad, ALrad, 0, this.EP[0]) // EP[0]:Bessel楕円体
    // 三次元直交座標系(X,Y,Z)から三次元直交座標系(X,Y,Z)への座標変換
    ;[X2, Y2, Z2] = this.xyz2xyz(X1, Y1, Z1)
    // 三次元直交座標系(X,Y,Z)から緯度，経度への換算
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ;[Brad = 0.0, ALrad = 0.0, H = 0.0] = this.XYZBLHcalc(X2, Y2, Z2, this.EP[1]) // EP[1]:GRS-80楕円体

    const B2 = Brad * this.rad2deg
    const L2 = ALrad * this.rad2deg

    return [B2, L2]
  }

  // 「3ﾊﾟﾗﾒｰﾀによる」ITRF94系からTokyo97系への座標変換
  private ITRF94toTokyo97(B1: number, L1: number): [B2: number, L2: number] {
    // Ver.1.1  1999/1/28  (C) Mikio TOBITA 飛田幹男，国土地理院
    // 「3ﾊﾟﾗﾒｰﾀによる」ITRF94系からTokyo97系への座標変換を行う。
    // この変換では楕円体高Hは，変換後の水平位置B2,L2を正確に元に戻すため，2ステップで変換する。
    // (1)初期値はゼロとし一度変換したあと，(2)その時のH分だけ下駄を履かせ，もう一度変換する。
    // by 飛田幹男
    // 入力　B1    : 緯度(度)
    // 　　　L1    : 経度(度)
    // 出力　B2    : 緯度(度)
    // 　　　L2    : 経度(度)
    let Brad1 = 0.0,
      ALrad1 = 0.0 // 緯度，経度(radian)
    let Brad2, ALrad2 // 緯度，経度(radian)
    let H = 0.0 // 楕円体高(m)
    let X1 = 0.0,
      Y1 = 0.0,
      Z1 = 0.0,
      X2 = 0.0,
      Y2 = 0.0,
      Z2 = 0.0 // (m)

    Brad1 = B1 * this.deg2rad
    ALrad1 = L1 * this.deg2rad

    // (1)
    // 緯度，経度から三次元直交座標系(X,Y,Z)への換算
    ;[X1, Y1, Z1] = this.BLHXYZcalc(Brad1, ALrad1, 0.0, this.EP[1]) // EP[1]:GRS-80楕円体
    // 三次元直交座標系(X,Y,Z)から三次元直交座標系(X,Y,Z)への座標変換
    ;[X2, Y2, Z2] = this.xyz2xyzR(X1, Y1, Z1)
    // 三次元直交座標系(X,Y,Z)から緯度，経度への換算
    ;[Brad2 = 0.0, ALrad2 = 0.0, H = 0.0] = this.XYZBLHcalc(X2, Y2, Z2, this.EP[0]) // EP[0]:Bessel楕円体
    // (2)
    // 緯度，経度から三次元直交座標系(X,Y,Z)への換算
    ;[X1, Y1, Z1] = this.BLHXYZcalc(Brad1, ALrad1, -H, this.EP[1]) // EP[1]:GRS-80楕円体
    // 三次元直交座標系(X,Y,Z)から三次元直交座標系(X,Y,Z)への座標変換
    ;[X2, Y2, Z2] = this.xyz2xyzR(X1, Y1, Z1)
    // 三次元直交座標系(X,Y,Z)から緯度，経度への換算
    ;[Brad2 = 0.0, ALrad2 = 0.0, H = 0.0] = this.XYZBLHcalc(X2, Y2, Z2, this.EP[0]) // EP[0]:Bessel楕円体

    const B2 = Brad2 * this.rad2deg
    const L2 = ALrad2 * this.rad2deg

    return [B2, L2]
  }

  // 座標変換
  private xyz2xyz(X1: number, Y1: number, Z1: number): [X2: number, Y2: number, Z2: number] {
    // Ver.2.2  1999/1/29 (C) Mikio TOBITA 飛田幹男，国土地理院
    // 座標変換をします。
    // 変換ﾊﾟﾗﾒｰﾀは，Tokyo97からITRF94固定とします。TKY2JGD専用なので。
    //  |XS| |X| |T1| | D  -R3  R2||X|
    //  |YS|=|Y|+|T2|+| R3  D  -R1||Y|   cf. IERS ANNUAL REPORT FOR 1989
    //  |ZS| |Z| |T3| |-R2  R1  D ||Z|                             II-23
    //  入力　X1, Y1, Z1 : ３次元直交座標系での座標 (m)
    //  出力　X2, Y2, Z2 : ３次元直交座標系での座標 (m)
    //  座標変換パラメータ。パラメータファイル中のフォーマット。
    //         T1   : X shift(cm)
    //         T2   : Y shift(cm)
    //         T3   : Z shift(cm)
    //         D    : scale factor (e-8)
    //         R1   : rotation around X axis (marcsec)
    //         R2   : rotation around Y axis (marcsec)
    //         R3   : rotation around Z axis (marcsec)
    //  実際に計算するときのフォーマットでの座標変換パラメータ。
    //       T1real : X shift(m)
    //       T2real : Y shift(m)
    //       T3real : Z shift(m)
    //        Dreal : scale factor (e-0)
    //       R1real : rotation around X axis (radian)
    //       R2real : rotation around Y axis (radian)
    //       R3real : rotation around Z axis (radian)

    let T1, T2, T3
    //double D;
    //double R1, R2, R3;
    let T1real, T2real, T3real
    //double Dreal;
    //double R1real, R2real, R3real;

    // パラメータの代入　Tokyo97からITRF94へ
    //  -14641.40   50733.70   68050.70    0.00    0.00    0.00    0.00       Tokyo97        ITRF94
    T1 = -14641.4
    T2 = 50733.7
    T3 = 68050.7
    //D = 0.0
    //R1 = 0.0
    //R2 = 0.0
    //R3 = 0.0
    // 実際に使う変換パラメータの計算
    T1real = T1 * 0.01 // cm to m
    T2real = T2 * 0.01 // cm to m
    T3real = T3 * 0.01 // cm to m
    //Dreal = D * 0.00000001               '     e-8 to e-0
    //R1real = R1 * 0.001 / 3600# * deg2rad ' marcsec to radian
    //R2real = R2 * 0.001 / 3600# * deg2rad
    //R3real = R3 * 0.001 / 3600# * deg2rad

    // 一般的には７パラメータで次のように変換しますが，ここでは3パラメータなので不要な計算は省略します。
    //X2 = X1 + T1real + Dreal * X1 - R3real * Y1 + R2real * Z1
    //Y2 = Y1 + T2real + R3real * X1 + Dreal * Y1 - R1real * Z1
    //Z2 = Z1 + T3real - R2real * X1 + R1real * Y1 + Dreal * Z1
    const X2 = X1 + T1real
    const Y2 = Y1 + T2real
    const Z2 = Z1 + T3real

    return [X2, Y2, Z2]
  }

  // 座標変換
  private xyz2xyzR(X1: number, Y1: number, Z1: number): [X2: number, Y2: number, Z2: number] {
    // Ver.2.3  1999/5/30  (C) Mikio TOBITA 飛田幹男，国土地理院
    // 座標変換をします。
    // 逆方向変換 R:Reverse
    // 変換ﾊﾟﾗﾒｰﾀは，ITRF94からTokyo97固定とします。TKY2JGD専用なので。
    // 座標変換をします。
    //  |XS| |X| |T1| | D  -R3  R2||X|
    //  |YS|=|Y|+|T2|+| R3  D  -R1||Y|   cf. IERS ANNUAL REPORT FOR 1989
    //  |ZS| |Z| |T3| |-R2  R1  D ||Z|                             II-23
    //  入力　X1, Y1, Z1 : ３次元直交座標系での座標 (m)
    //  出力　X2, Y2, Z2 : ３次元直交座標系での座標 (m)
    //  座標変換パラメータ。パラメータファイル中のフォーマット。
    //         T1   : X shift(cm)
    //         T2   : Y shift(cm)
    //         T3   : Z shift(cm)
    //         D    : scale factor (e-8)
    //         R1   : rotation around X axis (marcsec)
    //         R2   : rotation around Y axis (marcsec)
    //         R3   : rotation around Z axis (marcsec)
    //  実際に計算するときのフォーマットでの座標変換パラメータ。
    //       T1real : X shift(m)
    //       T2real : Y shift(m)
    //       T3real : Z shift(m)
    //        Dreal : scale factor (e-0)
    //       R1real : rotation around X axis (radian)
    //       R2real : rotation around Y axis (radian)
    //       R3real : rotation around Z axis (radian)

    let T1, T2, T3
    //double D;
    //double R1, R2, R3;
    let T1real, T2real, T3real
    //double Dreal;
    //double R1real, R2real, R3real;

    // パラメータの代入　ITRF94からTokyo97へ
    // -14641.40   50733.70   68050.70    0.00    0.00    0.00    0.00       Tokyo97        ITRF94
    T1 = 14641.4
    T2 = -50733.7
    T3 = -68050.7
    //D = 0.0;
    //R1 = 0.0;
    //R2 = 0.0;
    //R3 = 0.0;
    // 実際に使う変換パラメータの計算
    T1real = T1 * 0.01 //      cm to m
    T2real = T2 * 0.01 //      cm to m
    T3real = T3 * 0.01 //      cm to m
    //Dreal = D * 0.00000001;				//     e-8 to e-0
    //R1real = R1 * 0.001 / 3600.0 * deg2rad;	// marcsec to radian
    //R2real = R2 * 0.001 / 3600.0 * deg2rad;
    //R3real = R3 * 0.001 / 3600.0 * deg2rad;

    // 一般的には７パラメータで次のように変換しますが，ここでは3パラメータなので不要な計算は省略します。
    // X2 = X1 + T1real + Dreal * X1 - R3real * Y1 + R2real * Z1;
    // Y2 = Y1 + T2real + R3real * X1 + Dreal * Y1 - R1real * Z1;
    // Z2 = Z1 + T3real - R2real * X1 + R1real * Y1 + Dreal * Z1;
    const X2 = X1 + T1real
    const Y2 = Y1 + T2real
    const Z2 = Z1 + T3real
    return [X2, Y2, Z2]
  }

  // B,L,HからX,Y,Zに変換
  private BLHXYZcalc(
    Brad: number,
    ALrad: number,
    H: number,
    EP: EllipPar
  ): [X: number, Y: number, Z: number] {
    // Ver.1.2  1999/1/29 (C) Mikio TOBITA 飛田幹男，国土地理院
    // Ver.1.2から，EllipPar Typeに対応
    // B,L,HからX,Y,Zに変換する。 このとき楕円体を指定する必要あり。
    // 入力   Brad : 緯度(RADIAN)
    //       ALrad : 経度(RADIAN)
    //           H : 高さ(m)
    //          EP : 楕円体パラメータ
    // 出力      X : ３次元直交座標系(m)
    //           Y : ３次元直交座標系(m)
    //           Z : ３次元直交座標系(m)

    let CB, CL, SB, SL, W, AN
    let a, e //FI,

    a = EP.a
    //	FI = EP.f1;
    e = EP.e
    CB = Math.cos(Brad)
    SB = Math.sin(Brad)
    CL = Math.cos(ALrad)
    SL = Math.sin(ALrad)
    W = Math.sqrt(1.0 - e * SB * SB)
    AN = a / W

    const X = (AN + H) * CB * CL
    const Y = (AN + H) * CB * SL
    const Z = (AN * (1.0 - e) + H) * SB
    return [X, Y, Z]
  }

  // X,Y,ZからB,L,Hに変換
  private XYZBLHcalc(
    X: number,
    Y: number,
    Z: number,
    EP: EllipPar
  ): [Brad?: number, ALrad?: number, H?: number] {
    // Ver.2.2  1999/1/29 (C) Mikio TOBITA 飛田幹男，国土地理院
    // Ver.2.2から，EllipPar Typeに対応
    // X,Y.ZからB,L,Hに変換する。 このとき楕円体を指定する必要あり。
    // 入力   X    : ３次元直交座標系(m)
    //        Y    : ３次元直交座標系(m)
    //        Z    : ３次元直交座標系(m)
    //        EP   : 楕円体パラメータ
    // 出力   Brad : 緯度(RADIAN)
    //       ALrad : 経度(RADIAN)
    //        H    : 高さ(m)

    let p2, p, r
    let myu, myus3, myuc3
    //double tmp;
    let a, FI, e

    a = EP.a
    FI = EP.f1
    e = EP.e

    p2 = X * X + Y * Y
    p = Math.sqrt(p2)
    if (p === 0) {
      //				printf("Warning: 座標値(X,Y,Z)をが不正です。/n");
      return []
    }

    let ALrad
    if (X === 0) {
      ALrad = this.HAF_PI
    } else {
      ALrad = Math.atan(Y / X) // 経度
    }

    if (X < 0) {
      ALrad = ALrad + this.PI
    }
    if (ALrad > this.PI) {
      ALrad = ALrad - this.TWO_PI
    }

    r = Math.sqrt(p2 + Z * Z)
    myu = Math.atan((Z / p) * (1.0 - 1.0 / FI + (e * a) / r))
    myus3 = Math.sin(myu)
    myus3 = myus3 * myus3 * myus3
    myuc3 = Math.cos(myu)
    myuc3 = myuc3 * myuc3 * myuc3
    const Brad = Math.atan(
      (Z * (1.0 - 1.0 / FI) + e * a * myus3) / ((1.0 - 1.0 / FI) * (p - e * a * myuc3))
    )
    const H =
      p * Math.cos(Brad) +
      Z * Math.sin(Brad) -
      a * Math.sqrt(1.0 - e * Math.sin(Brad) * Math.sin(Brad)) // 楕円体高
    return [Brad, ALrad, H]
  }

  // Bilinear interpolation
  //	private TranPara Bilinear1(double lat , double lon)
  //	{
  //		// Ver.1.3  1999/3/11  (C) Mikio TOBITA 飛田幹男，国土地理院
  //		// Bilinear interpolationをする準備とBilinear interpolationのcall
  //		//1行1グリッド型変換パラメータファイル対応｡
  //		//1行にdB,dLの2つの変換ﾊﾟﾗﾒｰﾀがあるので，緯度，経度，同時に補間計算を行う。
  //		//入力座標 lat:y, lon:x   単位は度
  //		MeshCode MC0, MCE = new MeshCode(), MCN = new MeshCode(), MCNE  = new MeshCode();
  //
  //		int Npar1, Npar2, Npar3, Npar4;
  //		double dB00, dB10, dB01, dB11;
  //		double dL00, dL10, dL01, dL11;
  //
  //		// from Ver.1.3.78 2001/11/22
  //		// マイナスの緯度（南緯），経度（西経）等日本の領土外は標準地域メッシュコードが定義されていない場所では，
  //		// 地域毎の変換パラメータがないので，直ちにOutsideにとぶ。
  //		// この判定がなかったVer.1.3.77では，メッシュコードを検索に行ってしまい。見つかってしまうバグがあった。
  //		// なお，このバグは日本領土内では結果にまったく影響しない。
  //		TranPara returnTranPara;
  //		returnTranPara.dB = -9999.0;
  //		returnTranPara.dL = -9999.0;
  //		if (lat < 20.0 || lat > 46.0)
  //		{	//緯度のチェック
  //			return returnTranPara;
  //		}
  //		if (lon < 120.0 || lon > 154.0)
  //		{	//経度のチェック
  //			return returnTranPara;
  //		}
  //
  //		// 地域毎の変換パラメータが読まれているかチェック
  //		if (g_AreaParamList.Count === 0)
  //		{
  //			return returnTranPara;
  //		}
  //
  //		//lat,lonからMesh Codeを作成。
  //		MC0 = LatLon2MeshCode(lat, lon);		//lat,lonを含むメッシュのﾒｯｼｭｺｰﾄﾞを計算
  //		NextMeshCode2(MC0, ref MCE, ref MCN, ref MCNE);	//MC0の東，北，東北隣のﾒｯｼｭｺｰﾄﾞを計算
  //
  //		//parameter search。1行1ｸﾞﾘｯﾄﾞ型。データファイルの座標系つまり旧東京測地系(=旧日本測地系)で。
  //		//4つの内最初の1つは，ﾊﾟﾗﾒｰﾀﾌｧｲﾙの最初からサーチするが，他の3つはそれ以降順番に探すのみ。
  //		//ﾊﾟﾗﾒｰﾀﾌｧｲﾙは低緯度から高緯度に，同じ緯度なら，低経度から高経度の順番に並ぶべき。
  //		//メッシュコードの小さい順ではない。
  //		bool retryFlag = false;
  //		int paraListLen = g_AreaParamList.Count;
  //		int i = 0;
  //		while (((AreaParamData)g_AreaParamList[i]).MC != MC0.MC123)
  //		{
  //			i++;
  //			if (i >= paraListLen)
  //			{
  //				return returnTranPara;	// Outside
  //			}
  //		}
  //		Npar1 = i;
  //
  //		while (((AreaParamData)g_AreaParamList[i]).MC != MCE.MC123)
  //		{	//東隣 次から検索
  //			i++;
  //			if (i >= paraListLen)
  //			{
  //				retryFlag = true;
  //				break;
  //			}
  //		}
  //		if (retryFlag)
  //		{
  //			i = 0;
  //			while (((AreaParamData)g_AreaParamList[i]).MC != MCE.MC123)
  //			{	//東隣 最初から検索
  //				i++;
  //				if (i > Npar1)
  //				{
  //					return returnTranPara;	// Outside
  //				}
  //			}
  //			Npar2 = i;
  //		}
  //		else
  //		{
  //			Npar2 = i;
  //		}
  //
  //		retryFlag = false;
  //		while (((AreaParamData)g_AreaParamList[i]).MC != MCN.MC123)
  //		{	//北隣 次から検索
  //			i++;
  //			if (i >= paraListLen)
  //			{
  //				retryFlag = true;
  //				break;
  //			}
  //		}
  //		if (retryFlag)
  //		{
  //			i = 0;
  //			while (((AreaParamData)g_AreaParamList[i]).MC != MCN.MC123)
  //			{	//北隣 最初から検索
  //				i++;
  //				if (i > Npar2)
  //				{
  //					return returnTranPara;	// Outside
  //				}
  //			}
  //			Npar3 = i;
  //		}
  //		else
  //		{
  //			Npar3 = i;
  //		}
  //
  //		retryFlag = false;
  //		while (((AreaParamData)g_AreaParamList[i]).MC != MCNE.MC123)
  //		{	//北東隣 次から検索
  //			i++;
  //			if (i >= paraListLen)
  //			{
  //				retryFlag = true;
  //				break;
  //			}
  //		}
  //		if (retryFlag)
  //		{
  //			i = 0;
  //			while (((AreaParamData)g_AreaParamList[i]).MC != MCNE.MC123)
  //			{	//北東隣 最初から検索
  //				i++;
  //				if (i > Npar3)
  //				{
  //					return returnTranPara;	// Outside
  //				}
  //			}
  //			Npar4 = i;
  //		}
  //		else
  //		{
  //			Npar4 = i;
  //		}
  //
  //		//変換ﾊﾟﾗﾒｰﾀの代入
  //
  //		dB00 = ((AreaParamData)g_AreaParamList[Npar1]).dB1;
  //		dB10 = ((AreaParamData)g_AreaParamList[Npar2]).dB1;	//東隣
  //		dB01 = ((AreaParamData)g_AreaParamList[Npar3]).dB1;	//北隣
  //		dB11 = ((AreaParamData)g_AreaParamList[Npar4]).dB1;	//北東隣
  //		dL00 = ((AreaParamData)g_AreaParamList[Npar1]).dL1;
  //		dL10 = ((AreaParamData)g_AreaParamList[Npar2]).dL1;	//東隣
  //		dL01 = ((AreaParamData)g_AreaParamList[Npar3]).dL1;	//北隣
  //		dL11 = ((AreaParamData)g_AreaParamList[Npar4]).dL1;	//北東隣
  //
  //		//bilinear補間。データファイルの座標系つまり日本測地系で。
  //		//結果は，緯度，経度のJGD2000－日本測地系,または，Tokyo97-日本測地系
  //		//ModLat，ModLonは0以上1未満
  //		interpol1(dB00, dB10, dB01, dB11, MC0.ModLon, MC0.ModLat, ref returnTranPara.dB);
  //		interpol1(dL00, dL10, dL01, dL11, MC0.ModLon, MC0.ModLat, ref returnTranPara.dL);
  //
  //		return returnTranPara;
  //	}
  //

  // 	// Bilinear interpolation
  // 	private void interpol1(double u1, double u2, double u3, double u4, double X0to1, double Y0to1, ref double Z)
  // 	{
  // 		// Ver.2.1  1999/2/4  (C) Mikio TOBITA 飛田幹男，国土地理院
  // 		// Bilinear interpolation
  // 		// X0to1, Y0to1は0以上1未満
  // 		//
  // 		//  ^
  // 		// Y|
  // 		//  u3   u4
  // 		//
  // 		//  u1   u2  -> X
  // 		//
  // 		double a, B0, C, D;
  // 		a = u1;
  // 		B0 = u2 - u1;
  // 		C = u3 - u1;
  // 		D = u4 - u2 - u3 + u1;
  // 		Z = a + B0 * X0to1 + C * Y0to1 + D * X0to1 * Y0to1;
  // 	}

  // 	// 度単位の緯度経度(lat,lon)が含まれるﾒｯｼｭコードを返す
  // 	private MeshCode LatLon2MeshCode(double lat, double lon)
  // 	{
  // 		// Ver.2.2  2002/3/15  (C) Mikio TOBITA 飛田幹男，国土地理院
  // 		//度単位の緯度lat,経度lonを受け取り，その点が含まれるﾒｯｼｭコードを返す関数
  // 		//もし境界線上の点が与えられると，その点は点の北や東のﾒｯｼｭに属すると解釈する
  // 		//internal Type MeshCode
  // 		//  MC1 As Integer     //１次メッシュコード　4桁 ex.5438
  // 		//  MC2 As Integer     //２次メッシュコード　2桁 ex.23
  // 		//  MC3 As Integer     //３次メッシュコード　2桁 ex.45
  // 		//  MC123 As Long      //すべて                 ex.54382345
  // 		//  MCs As String * 10 //正式な形式の文字列型    ex."5438-23-45"
  // 		//  ModLat as double   //余り。3次メッシの左下（南西角）点から何度ずれているか
  // 		//  ModLon as double   //余り。3次メッシの左下（南西角）点から何度ずれているか
  // 		//End Type

  // 		int lat1, lon1, LatLon1;	// 1次メッシュコード
  // 		int lat2, lon2, latlon2;	// 2次メッシュコード
  // 		int lat3, lon3, latlon3;	// 3次メッシュコード
  // 		double ModLat, ModLon;
  // 		MeshCode retMeshCode;

  // 		// 1次メッシュコード各2桁
  // 		lat1 = (int)(lat * 1.5);	//  36.0 -> 54,  36.666 -> 54
  // 		lon1 = (int)(lon) - 100;	// 138.0 -> 38, 138.999 -> 38
  // 		// 2次メッシュコード各1桁
  // 		lat2 = (int)(8.0 * (1.5 * lat - lat1));		//  36.0 -> 0,  36.0833 -> 0
  // 		lon2 = (int)(8.0 * (lon - (lon1 + 100)));	// 138.0 -> 0, 138.1249 -> 0
  // 		// 3次メッシュコード各1桁
  // 		lat3 = (int)(10.0 * (12.0 * lat - 8.0 * lat1 - lat2) + 0.00000000001);
  // 		lon3 = (int)(10.0 * (8.0 * (lon - (lon1 + 100)) - lon2) + 0.00000000001);
  // 		//上2行が微少量を加えるのは，lon=138.45のとき3次が5とならずに6となるように

  // 		//Ver.2.1 to Ver.2.2 lat=36.0833333333333のときlat3=10になって，エラー画面が出るバグを解消。原因は微小量を加えたことの副作用。
  // 		//本来は微小量加算をやめるべきだが，以前の計算値との継続性を重視し，正しい緯(経)度同士の繰り上がり処理で対応する。2002/02/21
  // 		if (lat3 === 10)
  // 		{
  // 			lat2 = lat2 + 1; lat3 = 0;
  // 			if (lat2 === 8)
  // 			{
  // 				lat1 = lat1 + 1; lat2 = 0;
  // 			}
  // 		}

  // 		if (lon3 === 10)
  // 		{
  // 			lon2 = lon2 + 1; lon3 = 0;
  // 			if (lon2 === 8)
  // 			{
  // 				lon1 = lon1 + 1; lon2 = 0;
  // 			}
  // 		}

  // 		// 3次メッシの左下（南西角）点から何度ずれているか？
  // 		ModLat = 120.0 * lat - 80.0 * lat1 - 10 * lat2 - lat3;		//余り。3次メッシの左下（南西角）点からどれくらいずれているか。0(西端)以上1(東端)未満
  // 		ModLon = 80.0 * (lon - (lon1 + 100)) - 10 * lon2 - lon3;	//余り。3次メッシの左下（南西角）点からどれくらいずれているか。0(南端)以上1(北端)未満

  // 		// 各メッシュコードの桁位置を調整し3次メッシュコードを合成する
  // 		LatLon1 = lat1 * 100 + lon1;	// ex. 5438
  // 		latlon2 = lat2 * 10 + lon2;		// ex. 23   00 to 77
  // 		latlon3 = lat3 * 10 + lon3;		// ex. 45   00 to 99

  // 		retMeshCode.MC1 = LatLon1;	// 5438
  // 		retMeshCode.MC2 = latlon2;	// 23
  // 		retMeshCode.MC3 = latlon3;	// 45
  // 		retMeshCode.MC123 = LatLon1 * 10000L + latlon2 * 100L + latlon3;		// 54382345
  // 		retMeshCode.MCs = System.String.Format("{0,D4}-{1,D2}-{2,D2}",LatLon1, latlon2, latlon3);	// "5438-23-45"

  // 		retMeshCode.ModLat = ModLat;
  // 		retMeshCode.ModLon = ModLon;

  // 		return retMeshCode;
  // 	}

  // 	// 基本ﾒｯｼｭｺｰﾄﾞMeshCode1を受け取り，隣の東，北，北東のﾒｯｼｭコードを返す
  // 	private void NextMeshCode2(MeshCode MeshCode1, ref MeshCode MeshCodeE, ref MeshCode MeshCodeN, ref MeshCode MeshCodeNE)
  // 	{
  // 		// Ver.1.2  1999/2/2  (C) Mikio TOBITA 飛田幹男，国土地理院
  // 		// 基本ﾒｯｼｭｺｰﾄﾞMeshCode1を受け取り，隣の東，北，北東のﾒｯｼｭコードを返すサブルーチン
  // 		//internal Type MeshCode //参考のため構造体を以下に示す
  // 		//  MC1 As Integer     //１次メッシュコード　4桁 ex.5438
  // 		//  MC2 As Integer     //２次メッシュコード　2桁 ex.23
  // 		//  MC3 As Integer     //３次メッシュコード　2桁 ex.45
  // 		//  MC123 As Long      //すべて                 ex.54382345
  // 		//  MCs As String * 10 //正式な形式の文字列型    ex."5438-23-45"
  // 		//End Type
  // 		//called by Bilinear1  バイリニア補間用

  // 		MeshCode MCbuf = new MeshCode();
  // 		int lat1, lon1;		// 1次メッシュコード
  // 		int lat2, lon2;		// 2次メッシュコード
  // 		int lat3, lon3;		// 3次メッシュコード
  // 		int lat1out, lon1out, latlon1out;	// 1次メッシュコード
  // 		int lat2out, lon2out, latlon2out;	// 2次メッシュコード
  // 		int lat3out, lon3out, latlon3out;	// 3次メッシュコード

  // 		//①まず基本ﾒｯｼｭｺｰﾄﾞを分解し要素を取り出す。//ex.54382345
  // 		// 1次メッシュコード各2桁
  // 		lat1 = MeshCode1.MC1 / 100;	//ex.54
  // 		lon1 = MeshCode1.MC1 % 100;	//ex.38
  // 		// 2次メッシュコード各1桁
  // 		lat2 = MeshCode1.MC2 / 10;	//ex.2
  // 		lon2 = MeshCode1.MC2 % 10;	//ex.3
  // 		// 3次メッシュコード各1桁
  // 		lat3 = MeshCode1.MC3 / 10;	//ex.4
  // 		lon3 = MeshCode1.MC3 % 10;	//ex.5

  // 		//東側ﾒｯｼｭ
  // 		//②出力変数に代入したあと，となりのﾒｯｼｭｺｰﾄﾞを計算する。
  // 		lat1out = lat1;
  // 		lon1out = lon1;
  // 		lat2out = lat2;
  // 		lon2out = lon2;
  // 		lat3out = lat3;
  // 		//    lon3out = lon3;
  // 		if (lon3 != 9)
  // 		{
  // 			lon3out = lon3 + 1;
  // 		}
  // 		else
  // 		{
  // 			lon3out = 0;
  // 			if (lon2 != 7)
  // 			{
  // 				lon2out = lon2 + 1;
  // 			}
  // 			else
  // 			{
  // 				lon2out = 0;
  // 				lon1out = lon1 + 1;
  // 			}
  // 		}

  // 		//③各メッシュコードの桁位置を調整し3次メッシュコードを合成する
  // 		latlon1out = lat1out * 100 + lon1out;	// ex. 5438
  // 		latlon2out = lat2out * 10 + lon2out;	// ex. 23   00 to 77
  // 		latlon3out = lat3out * 10 + lon3out;	// ex. 45   00 to 99

  // 		//④結果を仮の変数に代入
  // 		MCbuf.MC1 = latlon1out;	// 5438
  // 		MCbuf.MC2 = latlon2out;	// 23
  // 		MCbuf.MC3 = latlon3out;	// 45
  // 		MCbuf.MC123 = latlon1out * 10000L + latlon2out * 100L + latlon3out;			// 54382345
  // 		MCbuf.MCs = System.String.Format("{0,D4}-{1,D2}-{2,D2}",latlon1out, latlon2out, latlon3out);

  // 		//⑤仮の変数から本当の変数に代入
  // 		MeshCodeE = MCbuf;

  // 		//北側ﾒｯｼｭ
  // 		//②出力変数に代入したあと，となりのﾒｯｼｭｺｰﾄﾞを計算する。
  // 		lat1out = lat1;
  // 		lon1out = lon1;
  // 		lat2out = lat2;
  // 		lon2out = lon2;
  // 		//    lat3out = lat3;
  // 		//    lon3out = lon3;
  // 		if (lat3 != 9)
  // 		{
  // 			lat3out = lat3 + 1;
  // 		}
  // 		else
  // 		{
  // 			lat3out = 0;
  // 			if (lat2 != 7)
  // 			{
  // 				lat2out = lat2 + 1;
  // 			}
  // 			else
  // 			{
  // 				lat2out = 0;
  // 				lat1out = lat1 + 1;
  // 			}
  // 		}

  // 		//③各メッシュコードの桁位置を調整し3次メッシュコードを合成する
  // 		latlon1out = lat1out * 100 + lon1out;	// ex. 5438
  // 		latlon2out = lat2out * 10 + lon2out;	// ex. 23   00 to 77
  // 		latlon3out = lat3out * 10 + lon3out;	// ex. 45   00 to 99

  // 		//④結果を仮の変数に代入
  // 		MCbuf.MC1 = latlon1out;		// 5438
  // 		MCbuf.MC2 = latlon2out;		// 23
  // 		MCbuf.MC3 = latlon3out;		// 45
  // 		MCbuf.MC123 = latlon1out * 10000L + latlon2out * 100L + latlon3out;	// 54382345
  // 		MCbuf.MCs = System.String.Format("{0,D4}-{1,D2}-{2,D2}",latlon1out, latlon2out, latlon3out);

  // 		//⑤仮の変数から本当の変数に代入
  // 		MeshCodeN = MCbuf;

  // 		//北東側ﾒｯｼｭ
  // 		//②出力変数に代入したあと，となりのﾒｯｼｭｺｰﾄﾞを計算する。
  // 		lat1out = lat1;
  // 		lon1out = lon1;
  // 		lat2out = lat2;
  // 		lon2out = lon2;
  // 		//    lat3out = lat3;
  // 		//    lon3out = lon3;
  // 		if (lon3 != 9)
  // 		{	//東側
  // 			lon3out = lon3 + 1;
  // 		}
  // 		else
  // 		{
  // 			lon3out = 0;
  // 			if (lon2 != 7)
  // 			{
  // 				lon2out = lon2 + 1;
  // 			}
  // 			else
  // 			{
  // 				lon2out = 0;
  // 				lon1out = lon1 + 1;
  // 			}
  // 		}

  // 		if (lat3 != 9)
  // 		{	//北側
  // 			lat3out = lat3 + 1;
  // 		}
  // 		else
  // 		{
  // 			lat3out = 0;
  // 			if (lat2 != 7)
  // 			{
  // 				lat2out = lat2 + 1;
  // 			}
  // 			else
  // 			{
  // 				lat2out = 0;
  // 				lat1out = lat1 + 1;
  // 			}
  // 		}

  // 		//③各メッシュコードの桁位置を調整し3次メッシュコードを合成する
  // 		latlon1out = lat1out * 100 + lon1out;	// ex. 5438
  // 		latlon2out = lat2out * 10 + lon2out;	// ex. 23   00 to 77
  // 		latlon3out = lat3out * 10 + lon3out;	// ex. 45   00 to 99

  // 		//④結果を仮の変数に代入
  // 		MCbuf.MC1 = latlon1out;		// 5438
  // 		MCbuf.MC2 = latlon2out;		// 23
  // 		MCbuf.MC3 = latlon3out;		// 45
  // 		MCbuf.MC123 = latlon1out * 10000L + latlon2out * 100L + latlon3out;	// 54382345
  // 		MCbuf.MCs = System.String.Format("{0,D4}-{1,D2}-{2,D2}",latlon1out, latlon2out, latlon3out);

  // 		//⑤仮の変数から本当の変数に代入
  // 		MeshCodeNE = MCbuf;
  // 	}

  /**
   * doCalcXy2blFile：平面直角座標(X,Y)を緯度経度(B,L)に換算
   *
   * @param	KeiNum		系番号(内部で-1している)		(I)
   * @param	Ellip12		楕円体パラメータインデックス	(I)
   * @param	X, Y		平面直角座標		(I)
   * @param	Bout, Lout	緯度経度座標		(O)
   *
   */
  doCalcXy2blFile(
    KeiNum: number,
    Ellip12: number,
    X: number,
    Y: number
  ): [Bout: number, Lout: number] {
    // Ver.1.2  1999/5/30  (C) Mikio TOBITA 飛田幹男，国土地理院
    // X,YをB,Lに換算します。
    // Bessel楕円体専門。
    // 入力：経度X,Yは平面直角座標
    // 出力：Bout,Loutは度単位の緯度,経度
    // Ellip12=1: Bessel楕円体
    // Ellip12=2: GRS80楕円体
    // X , Y　： 平面直角座標。入力値。meter

    let M0 // 基準子午線の縮尺係数
    let B1, L1 // 原点の緯度，経度。基本的にradian
    let B0, L // 求める緯度，経度。基本的にradian
    //double Bdeg, Ldeg;	// 求める緯度，経度。基本的にdeg
    //int D, AM;
    //double S;
    //int SN;
    //char *SNS;

    let AEE, CEE, Ep2
    let AJ, BJ, CJ, DJ, EJ
    let FJ, GJ, HJ, IJ
    let S0 = 0.0 // 赤道から座標原点までの子午線弧長
    let M
    let Eta2, N1 //M1,		// phi1の関数
    //double Eta2phi, Mphi, Nphi;	// phi(=B)の関数
    let T, T2, T4, T6
    let e2, e4, e6, e8, e10
    let e12, e14, e16
    let S1 = 0.0,
      phi1,
      oldphi1
    let icountphi1
    let Bunsi, Bunbo
    let YM0, N1CosPhi1
    let EPs: EllipPar
    let kei_idx = KeiNum - 1 // 平面直感座標系 系インデックス

    // 基準子午線の縮尺係数
    M0 = 0.9999

    // 楕円体ﾊﾟﾗﾒｰﾀの代入
    EPs = new EllipPar(
      this.EP[Ellip12].a,
      this.EP[Ellip12].f1,
      this.EP[Ellip12].f,
      this.EP[Ellip12].e
    )
    e2 = EPs.e
    e4 = e2 * e2
    e6 = e4 * e2
    e8 = e4 * e4
    e10 = e8 * e2
    e12 = e8 * e4
    e14 = e8 * e6
    e16 = e8 * e8

    // 定数項 the same as bl2xy
    AEE = EPs.a * (1.0 - EPs.e) // a(1-e2)
    CEE = EPs.a / Math.sqrt(1.0 - EPs.e) // C=a*sqr(1+e'2)=a/sqr(1-e2)
    Ep2 = EPs.e / (1.0 - EPs.e) // e'2 (e prime 2) Eta2を計算するため

    // 「緯度を与えて赤道からの子午線弧長を求める計算」のための９つの係数を求める。
    // 「精密測地網一次基準点測量計算式」P55,P56より。係数チェック済み1999/10/19。
    AJ = (4927697775.0 / 7516192768.0) * e16
    AJ = AJ + (19324305.0 / 29360128.0) * e14
    AJ = AJ + (693693.0 / 1048576.0) * e12
    AJ = AJ + (43659.0 / 65536.0) * e10
    AJ = AJ + (11025.0 / 16384.0) * e8
    AJ = AJ + (175.0 / 256.0) * e6
    AJ = AJ + (45.0 / 64.0) * e4
    AJ = AJ + (3.0 / 4.0) * e2
    AJ = AJ + 1.0
    BJ = (547521975.0 / 469762048.0) * e16
    BJ = BJ + (135270135.0 / 117440512.0) * e14
    BJ = BJ + (297297.0 / 262144.0) * e12
    BJ = BJ + (72765.0 / 65536.0) * e10
    BJ = BJ + (2205.0 / 2048.0) * e8
    BJ = BJ + (525.0 / 512.0) * e6
    BJ = BJ + (15.0 / 16.0) * e4
    BJ = BJ + (3.0 / 4.0) * e2
    CJ = (766530765.0 / 939524096.0) * e16
    // CJ = CJ + 45090045.0 / 5870256.0 * e14 精密測地網一次基準点測量作業規定の誤りによるバグ
    CJ = CJ + (45090045.0 / 58720256.0) * e14
    CJ = CJ + (1486485.0 / 2097152.0) * e12
    CJ = CJ + (10395.0 / 16384.0) * e10
    CJ = CJ + (2205.0 / 4096.0) * e8
    CJ = CJ + (105.0 / 256.0) * e6
    CJ = CJ + (15.0 / 64.0) * e4
    DJ = (209053845.0 / 469762048.0) * e16
    DJ = DJ + (45090045.0 / 117440512.0) * e14
    DJ = DJ + (165165.0 / 524288.0) * e12
    DJ = DJ + (31185.0 / 131072.0) * e10
    DJ = DJ + (315.0 / 2048.0) * e8
    DJ = DJ + (35.0 / 512.0) * e6
    EJ = (348423075.0 / 1879048192.0) * e16
    EJ = EJ + (4099095.0 / 29360128.0) * e14
    EJ = EJ + (99099.0 / 1048576.0) * e12
    EJ = EJ + (3465.0 / 65536.0) * e10
    EJ = EJ + (315.0 / 16384.0) * e8
    FJ = (26801775.0 / 469762048.0) * e16
    FJ = FJ + (4099095.0 / 117440512.0) * e14
    FJ = FJ + (9009.0 / 524288.0) * e12
    FJ = FJ + (693.0 / 131072.0) * e10
    GJ = (11486475.0 / 939524096.0) * e16
    GJ = GJ + (315315.0 / 58720256.0) * e14
    GJ = GJ + (3003.0 / 2097152.0) * e12
    HJ = (765765.0 / 469762048.0) * e16
    HJ = HJ + (45045.0 / 117440512.0) * e14
    IJ = (765765.0 / 7516192768.0) * e16

    // 座標系原点緯度，経度
    B1 = this.kei_tab[kei_idx][0] // 原点緯度(deg)
    L1 = this.kei_tab[kei_idx][1] // 原点経度(deg)
    B1 = B1 * this.deg2rad // 原点緯度(rad)
    L1 = L1 * this.deg2rad // 原点経度(rad)

    // 赤道からの子午線長の計算
    S0 = this.MeridS(B1, AEE, AJ, BJ, CJ, DJ, EJ, FJ, GJ, HJ, IJ) // 赤道から座標原点までの子午線弧長
    M = S0 + X / M0 // 「精密測地網一次基準点測量計算式」P57中段

    // Baileyの式による異性緯度（isometric latitude）phi1の計算。
    // 「精密測地網一次基準点測量計算式」P57の11.(1)の式から。
    // この式と「現代測量学１ 測量の数学的基礎」P102の式とは，Cos(phi1)だけ異なる。
    // この式を導入したためベッセル楕円体以外で往復計算OKとなった。
    icountphi1 = 0
    phi1 = B1
    do {
      icountphi1 = icountphi1 + 1
      oldphi1 = phi1
      S1 = this.MeridS(phi1, AEE, AJ, BJ, CJ, DJ, EJ, FJ, GJ, HJ, IJ) // 赤道から点までの子午線弧長
      //Bunsi = 2.0 * (S1 - M) * (1.0 - EPs.e * Math.Sin(phi1) * Math.Sin(phi1)) ^ 1.5;
      Bunsi = 2.0 * (S1 - M) * Math.pow(1.0 - EPs.e * Math.sin(phi1) * Math.sin(phi1), 1.5)
      Bunbo =
        3.0 *
          EPs.e *
          (S1 - M) *
          Math.sin(phi1) *
          Math.cos(phi1) *
          Math.sqrt(1.0 - EPs.e * Math.sin(phi1) * Math.sin(phi1)) -
        2.0 * EPs.a * (1.0 - EPs.e)
      phi1 = phi1 + Bunsi / Bunbo
    } while (Math.abs(phi1 - oldphi1) > 0.00000000000001 && icountphi1 < 100) // 日本では1e-12で十分　iterationの回数は４回

    // 本計算
    // 何度も使う式を変数に代入
    YM0 = Y / M0
    T = Math.tan(phi1) // 「精密測地網一次基準点測量計算式」P51のt1に等しい
    T2 = T * T
    T4 = T2 * T2
    T6 = T4 * T2
    Eta2 = Ep2 * Math.cos(phi1) * Math.cos(phi1) // =η1*η1
    //	M1 = CEE / sqrt((1.0 + Eta2) ^ 3.0);
    //	M1 = CEE / sqrt(pow( (1.0 + Eta2) , 3 ));
    N1 = CEE / Math.sqrt(1.0 + Eta2)
    N1CosPhi1 = N1 * Math.cos(phi1)

    // 緯度Bの計算 「精密測地網一次基準点測量計算式」P51のphiを求める式より
    //B0 = ((1385.0 + 3633.0 * T2 + 4095 * T4 + 1575.0 * T6) / (40320.0 * N1 ^ 8.0)) * YM0 ^ 8.0;
    B0 =
      ((1385.0 + 3633.0 * T2 + 4095 * T4 + 1575.0 * T6) / (40320.0 * Math.pow(N1, 8))) *
      Math.pow(YM0, 8)
    //B0 = B0 - ((61.0 + 90.0 * T2 + 45 * T4 + 107.0 * Eta2 - 162.0 * T2 * Eta2 - 45.0 * T4 * Eta2) / (720.0 * N1 ^ 6.0)) * YM0 ^ 6.0;
    B0 =
      B0 -
      ((61.0 + 90.0 * T2 + 45 * T4 + 107.0 * Eta2 - 162.0 * T2 * Eta2 - 45.0 * T4 * Eta2) /
        (720.0 * Math.pow(N1, 6))) *
        Math.pow(YM0, 6)
    //B0 = B0 + ((5.0 + 3.0 * T2 + 6.0 * Eta2 - 6.0 * T2 * Eta2 - 3.0 * Eta2 ^ 2 - 9.0 * T2 * Eta2 ^ 2) / (24.0 * N1 ^ 4.0)) * YM0 ^ 4.0;
    B0 =
      B0 +
      ((5.0 +
        3.0 * T2 +
        6.0 * Eta2 -
        6.0 * T2 * Eta2 -
        3.0 * Math.pow(Eta2, 2) -
        9.0 * T2 * Math.pow(Eta2, 2)) /
        (24.0 * Math.pow(N1, 4))) *
        Math.pow(YM0, 4)
    B0 = B0 - ((1.0 + Eta2) / (2.0 * Math.pow(N1, 2))) * Math.pow(YM0, 2)
    B0 = B0 * T
    B0 = B0 + phi1

    // 経度Lの計算 「精密測地網一次基準点測量計算式」P51のΔλを求める式より
    //L = -((61.0 + 662.0 * T2 + 1320.0 * T4 + 720.0 * T6) / (5040.0 * N1 ^ 6.0 * N1CosPhi1)) * YM0 ^ 7.0;
    L =
      -((61.0 + 662.0 * T2 + 1320.0 * T4 + 720.0 * T6) / (5040.0 * Math.pow(N1, 6) * N1CosPhi1)) *
      Math.pow(YM0, 7)
    //L = L + ((5.0 + 28.0 * T2 + 24.0 * T4 + 6.0 * Eta2 + 8.0 * T2 * Eta2) / (120.0 * N1 ^ 4.0 * N1CosPhi1)) * YM0 ^ 5.0;
    L =
      L +
      ((5.0 + 28.0 * T2 + 24.0 * T4 + 6.0 * Eta2 + 8.0 * T2 * Eta2) /
        (120.0 * Math.pow(N1, 4) * N1CosPhi1)) *
        Math.pow(YM0, 5)
    //L = L - ((1.0 + 2.0 * T2 + Eta2) / (6.0 * N1 ^ 2.0 * N1CosPhi1)) * YM0 ^ 3.0;
    L = L - ((1.0 + 2.0 * T2 + Eta2) / (6.0 * Math.pow(N1, 2) * N1CosPhi1)) * Math.pow(YM0, 3)
    L = L + (1.0 / N1CosPhi1) * YM0
    L = L + L1

    // 出力
    const Bout = B0 * this.rad2deg
    const Lout = L * this.rad2deg
    return [Bout, Lout]
  }

  // 	/**
  // 	* doCalcBl2xyFile：緯度経度(Bin, Lin)を平面直角座標(Xout, Yout)に換算
  // 	*
  // 	* @param	KeiNum		系番号(内部で-1している)		(I)
  // 	* @param	Ellip12		楕円体パラメータインデックス	(I)
  // 	* @param	Bin, Lin	緯度経度座標		(I)
  // 	* @param	Xout, Yout	平面直角座標		(O)
  // 	*
  // 	*/
  // 	internal void doCalcBl2xyFile(int KeiNum, int Ellip12, double Bin, double Lin, ref double Xout, ref double Yout)
  // 	{
  // 		// Ver.1.4  1999/10/19  (C) Mikio TOBITA 飛田幹男，国土地理院
  // 		// 「精密測地網一次基準点測量計算式」を導入し多くの項を採用。
  // 		// TKY2JGDではGRS80楕円体専門で利用。とはいってもどちらでも使える。called by XYFile
  // 		// Bin,Linは度単位の緯度，経度，Xout,Youtは平面直角座標。
  // 		// Ellip12=0: Bessel楕円体
  // 		// Ellip12=1: GRS80楕円体
  // 		// この計算は変換の第３段階なので緯度経度入力値のﾁｪｯｸは不要

  // 		double M0;		// 基準子午線の縮尺係数
  // 		double B1, L1;	// 原点の緯度，経度。基本的にradian
  // 		double B0, L;	// 入力される緯度，経度。基本的にradian
  // 		//double Bdeg, Ldeg;
  // 		//int D, AM, S, SN, SNS;
  // 		//double X, Y;		// 求められる平面直角座標X,Y
  // 		double Gamma = 0.0;		// =γ 子午線収差角。radian
  // 		//double Gammadeg;	// 真北方向角。deg
  // 		double MMM = 0.0;			// 縮尺係数
  // 		int kei_idx = KeiNum - 1; // 平面直感座標系 系インデックス

  // 		// 基準子午線の縮尺係数
  // 		M0 = 0.9999;

  // 		// 座標系原点緯度，経度
  // 		B1 = kei_tab[kei_idx,0];	// 原点緯度(deg)
  // 		L1 = kei_tab[kei_idx,1];	// 原点経度(deg)
  // 		B1 = B1 * deg2rad;	// 原点緯度(rad)
  // 		L1 = L1 * deg2rad;	// 原点経度(rad)

  // 		// チェック
  // 		/*
  // 		if (Bin < -90.00000000001 || Bin > 90.00000000001) {
  // 			printf("緯度は-90～90の範囲です。in doCalcBl2xyFile\n");
  // 		}
  // 		if (Lin < -180.00000000001 || Lin > 180.00000000001) {
  // 			printf("経度は-180～180の範囲です。in doCalcBl2xyFile\n");
  // 		}
  // 		*/

  // 		B0 = Bin * deg2rad;	// 変換したい緯度(rad)
  // 		L = Lin * deg2rad;	// 変換したい経度(rad)

  // 		// 本計算 EP[0]はBessel楕円体，EP[1]はGRS-80楕円体
  // 		calcBl2xy(B0, L, B1, L1, M0, EP[Ellip12], ref Xout, ref Yout, ref Gamma, ref MMM);
  // 	}

  /**
   * Jgd2Tky：緯度経度の世界測地系から日本測地系に変換
   *
   * @param	B1, L1		世界測地系緯度経度座標		(I)
   * @param	B2, L2		日本測地系緯度経度座標		(O)
   * @return	bool		true/false：座標変換失敗
   *
   */
  Jgd2Tky(B1: number, L1: number): [B2: number, L2: number] {
    // ２段階によるIteration(反復計算)により，パラメータファイル参照の緯度経度を日本測地系にする
    //（１）パラメータを参照し，bilinear補間法により補間し，
    //（２）補間した，dL,dBを実用成果のL,Bに加える。
    // 入力　B1    : 緯度(度)
    // 　　　L1    : 経度(度)
    // 出力　B2    : 緯度(度)
    // 　　　L2    : 経度(度)

    //		double dL, dB;
    //		double Ltemp, Btemp;
    //		TranPara TranPara1;

    // .NET版では「地域毎のﾊﾟﾗﾒｰﾀ」を読み込まないので「3ﾊﾟﾗﾒｰﾀ」で変換する
    const [B2, L2] = this.ITRF94toTokyo97(B1, L1)

    //		//（1）パラメータを参照し，bilinear補間法により補間し，
    //		//(1-1)第一段階｛パラメータを参照しにいく緯度，経度は仮の値である。｝
    //		Ltemp = L1 + 12.0 / 3600.0;	// 平均値を用いてJGD2000系を日本測地系へ
    //		Btemp = B1 - 12.0 / 3600.0;	// 平均値を用いてJGD2000系を日本測地系へ
    //		TranPara1 = Bilinear1(Btemp, Ltemp);
    //		dB = TranPara1.dB;
    //		dL = TranPara1.dL;
    //		if (dL === -9999.0 || dB === -9999.0)
    //		{
    //			//「地域毎のﾊﾟﾗﾒｰﾀ」がなかったら「3ﾊﾟﾗﾒｰﾀ」で変換する
    //			ITRF94toTokyo97(B1, L1, ref B2, ref L2);
    //		}
    //		else
    //		{	//「地域毎のﾊﾟﾗﾒｰﾀ」があったので変換する
    //			//（２）補間した，-dL,-dBを実用成果のL,Bに加える
    //			//(2-1)第一段階
    //			Ltemp = L1 - dL / 3600.0;
    //			Btemp = B1 - dB / 3600.0;
    //			//(2-2)第二段階｛パラメータを参照しにいく緯度，経度はほぼ真の日本測地系の値である。｝
    //			TranPara1 = Bilinear1(Btemp, Ltemp);
    //			dB = TranPara1.dB;
    //			dL = TranPara1.dL;
    //			if (dL === -9999.0 || dB === -9999.0)
    //			{
    //				return false;
    //			}
    //			//（２）補間した，-dL,-dBを実用成果のL,Bに加える
    //			//(2-1)第二段階
    //			L2 = L1 - dL / 3600.0;
    //			B2 = B1 - dB / 3600.0;
    //		}

    return [B2, L2]
  }

  /**
   * Tky2Jgd：緯度経度の日本測地系から世界測地系に変換
   *
   * @param	B1, L1		日本測地系緯度経度座標		(I)
   * @param	B2, L2		世界測地系緯度経度座標		(O)
   * @return	bool		true/false：座標変換失敗
   *
   */
  Tky2Jgd(B1: number, L1: number): [B2: number, L2: number] {
    // 入力　B1    : 緯度(度)
    // 　　　L1    : 経度(度)
    // 出力　B2    : 緯度(度)
    // 　　　L2    : 経度(度)

    // 「3ﾊﾟﾗﾒｰﾀ」でTokyo97系からITRF94系への座標変換を行う
    const [B2, L2] = this.Tokyo97toITRF94(B1, L1)

    //		//「地域毎のﾊﾟﾗﾒｰﾀで変換」を試みる
    //		//  パラメータを参照し，bilinear補間法により補間し，補間した，dL,dBを実用成果のL,Bに加える。
    //		// （変換ﾊﾟﾗﾒｰﾀﾌｧｲﾙが「1行1ｸﾞﾘｯﾄﾞ形式」だけ対応。）
    //		//「地域毎のﾊﾟﾗﾒｰﾀ」がなかったら「3ﾊﾟﾗﾒｰﾀ」で変換する
    //		TranPara TranPara1 = Bilinear1(B1, L1);
    //		double dL, dB;
    //		dB = TranPara1.dB;
    //		dL = TranPara1.dL;
    //		if (dL === -9999.0 || dB === -9999.0)
    //		{
    //			// 「3ﾊﾟﾗﾒｰﾀ」でTokyo97系からITRF94系への座標変換を行う
    //			Tokyo97toITRF94(B1, L1, ref B2, ref L2);
    //		}
    //		else
    //		{
    //			// 補間した，dL,dBを実用成果のL,Bに加える
    //			L2 = L1 + dL / 3600.0;
    //			B2 = B1 + dB / 3600.0;
    //		}
    return [B2, L2]
  }

  // 	/**
  // 	* getLLLength：緯度経度間の距離を求める
  // 	*
  // 	* @param	type		測地系				(I)
  // 	* @param	lat1, lon1	点1 緯度経度(°)	(I)
  // 	* @param	lat2, lon2	点2 緯度経度(°)	(I)
  // 	* @return	double		２地点1-2間の距離
  // 	*
  // 	*/
  // 	internal double getLLLength(int type, double lon1, double lat1, double lon2, double lat2)
  // 	{

  // 		double fr1, gr1, fr2, gr2;			// ２地点の緯度経度(rad)

  // 		double a = EP[type - 1].a;	// 赤道半径(m)

  // 		double e = EP[type - 1].e;	// 地球の離心率
  // 		double e2 = e * e;			// 地球の離心率の二乗

  // 		double x1, y1, z1, x2, y2, z2;		// ２地点の直交座標値(m)

  // 		double w;		// ２地点間の半射程角(°) (中心角の１／２)
  // 		double wr;		// ２地点間の半射程角(rad)
  // 		double r;		// ２地点間の直距離(m)
  // 		double s;		// ２地点間の地表面距離(m)

  // 		double N1, N2;		// 緯度補正した地球の半径(m) */

  // 		fr1 = lat1 * deg2rad;
  // 		gr1 = lon1 * deg2rad;
  // 		fr2 = lat2 * deg2rad;
  // 		gr2 = lon2 * deg2rad;

  // 		N1 = a / Math.Sqrt(1.0 - e2 * Math.Sin(fr1) * Math.Sin(fr1));
  // 		x1 = N1 * Math.Cos(fr1) * Math.Cos(gr1);
  // 		y1 = N1 * Math.Cos(fr1) * Math.Sin(gr1);
  // 		z1 = N1 * (1.0 - e2) * Math.Sin(fr1);

  // 		N2 = a / Math.Sqrt(1.0 - e2 * Math.Sin(fr2) * Math.Sin(fr2));
  // 		x2 = N2 * Math.Cos(fr2) * Math.Cos(gr2);
  // 		y2 = N2 * Math.Cos(fr2) * Math.Sin(gr2);
  // 		z2 = N2 * (1.0 - e2) * Math.Sin(fr2);

  // 		// 直距離
  // 		r = Math.Sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));

  // 		// 半射程角(rad)
  // 		wr = Math.Asin(r / 2 / a);

  // 		// 半射程角(°)
  // 		w = wr / deg2rad;

  // 		// 地表面距離
  // 		s = a * 2 *wr;

  // 		// 地表面距離(m)
  // 		return s;
  // 	}

  // 	#endregion
}
