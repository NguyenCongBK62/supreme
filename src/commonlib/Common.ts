/// <summary>
/// 外出ししないクラス（飛田Src以外）
/// </summary>
export class CCommon {
  static readonly ERROR_CODE = -999 // 【リファクタリング】読み取り専用にしました（ttc馬場）

  // #region "XmlReader"

  //private string TAG_UNIT = "unit";
  //private string TAG_UNIT_X ="unit_x";
  //private string TAG_UNIT_Y ="unit_y";
  //private string TAG_OFFSETXY ="offsetXY";
  //private string TAG_OFFSETLL ="offsetLL";
  //private string TAG_TOP_RIGHT ="top_right";
  //private string TAG_BOTTOM_LEFT ="bottom_left";
  //private string TAG_AREA ="area";

  //private string ATTR_X ="x";
  //private string ATTR_Y ="y";
  //private string ATTR_KEI ="kei";

  readIniXml(fineName_ini: string, defData: DefData) {
    const dUnitXY = 0.0
    const dUnitX = 0.0
    const dUnitY = 0.0
    const iOffsetLLX = 0
    const iOffsetLLY = 0
    const iOffsetXYX = 0
    const iOffsetXYY = 0

    // 初期XML読込み
    //XmlTextReader txtReader = null;
    //XmlDocument xmlDoc = null;

    //try
    //{
    //    //txtReader = new XmlTextReader( fineName_ini );
    //    //xmlDoc = new XmlDocument();
    //    //xmlDoc.Load(txtReader);

    //    //XmlNodeList nodeList = xmlDoc.GetElementsByTagName(TAG_UNIT);
    //    //// 平面直角座標の単位
    //    //if(nodeList.Count > 0)	dUnitXY = XmlConvert.ToDouble(nodeList.Item(0).InnerText);

    //    //// 緯度経度座標単位
    //    //nodeList = xmlDoc.GetElementsByTagName(TAG_UNIT_X);
    //    //if(nodeList.Count > 0)	dUnitX = XmlConvert.ToDouble(nodeList.Item(0).InnerText);
    //    //nodeList = xmlDoc.GetElementsByTagName(TAG_UNIT_Y);
    //    //if(nodeList.Count > 0)	dUnitY = XmlConvert.ToDouble(nodeList.Item(0).InnerText);

    //    //// 平面直角座標のオフセット
    //    //nodeList = xmlDoc.GetElementsByTagName(TAG_OFFSETXY);
    //    //if(nodeList.Count > 0)
    //    //{
    //    //    XmlAttributeCollection attrCol = nodeList.Item(0).Attributes;
    //    //    if(attrCol.Count > 1)
    //    //    {
    //    //        iOffsetXYX = XmlConvert.ToInt32(attrCol.GetNamedItem(ATTR_X).InnerText);
    //    //        iOffsetXYY = XmlConvert.ToInt32(attrCol.GetNamedItem(ATTR_Y).InnerText);
    //    //    }
    //    //}

    //    //// 緯度経度座標のオフセット
    //    //nodeList = xmlDoc.GetElementsByTagName(TAG_OFFSETLL);
    //    //if(nodeList.Count > 0)
    //    //{
    //    //    XmlAttributeCollection attrCol = nodeList.Item(0).Attributes;
    //    //    if(attrCol.Count > 1)
    //    //    {
    //    //        iOffsetLLX = XmlConvert.ToInt32(attrCol.GetNamedItem(ATTR_X).InnerText);
    //    //        iOffsetLLY = XmlConvert.ToInt32(attrCol.GetNamedItem(ATTR_Y).InnerText);
    //    //    }
    //    //}
    //}
    //catch
    //{
    //    if ( txtReader != null ) txtReader.Close();
    //    return false;
    //}

    //try
    //{
    //    XmlNodeList nodeList = nodeList = xmlDoc.GetElementsByTagName(TAG_AREA);
    //    for(int nodeCnt = 0; nodeCnt < nodeList.Count; nodeCnt++)
    //    {
    //        XmlAttributeCollection attrCol = nodeList.Item(nodeCnt).Attributes;
    //        if(attrCol.Count > 0)
    //        {
    //            String delimStr = ", ";
    //            Char[]  delimiter= delimStr.ToCharArray();

    //            int kei = 0;
    //            double lonBL = 0.0;
    //            double latBL = 0.0;
    //            double lonTR = 0.0;
    //            double latTR = 0.0;
    //            // 系番号
    //            kei = XmlConvert.ToInt32(attrCol.GetNamedItem(ATTR_KEI).InnerText);
    //            // 左上緯度経度
    //            XmlNodeList boundNode = nodeList.Item(nodeCnt).ChildNodes;
    //            if(boundNode.Count == 2)
    //            {
    //                if(String.Compare(boundNode.Item(0).Name, TAG_BOTTOM_LEFT) == 0)
    //                {
    //                    String[] splitBL = boundNode.Item(0).InnerText.Split(delimiter, 2);
    //                    //TAG_BOTTOLEFT
    //                    lonBL = XmlConvert.ToDouble(splitBL[0]);
    //                    latBL = XmlConvert.ToDouble(splitBL[1]);
    //                }
    //                if(String.Compare(boundNode.Item(1).Name, TAG_TOP_RIGHT) == 0)
    //                {
    //                    String[] splitTR = boundNode.Item(1).InnerText.Split(delimiter, 2);
    //                    //TAG_TOP_RIGHT
    //                    lonTR = XmlConvert.ToDouble(splitTR[0]);
    //                    latTR = XmlConvert.ToDouble(splitTR[1]);
    //                }
    //            }
    //            else
    //            {
    //                continue;
    //            }
    //            AreaData aData = new AreaData(kei, lonBL, latBL, lonTR, latTR);
    //            defData.setAreaData(aData);
    //        }
    //    }
    //}
    //catch
    //{
    //    defData.setDefault();
    //}
    //finally
    //{
    //    if (txtReader != null)	txtReader.Close();
    //}

    defData.setUnitOffset(dUnitXY, iOffsetXYX, iOffsetXYY, dUnitX, dUnitY, iOffsetLLX, iOffsetLLY)

    return true
  }

  // #endregion
}

/// <summary>
/// 緯度経度クラス
/// </summary>
export class CoordLL {
  /// <summary>経度</summary>
  m_lon: number
  /// <summary>緯度</summary>
  m_lat: number

  /// <summary>
  /// コンストラクタ
  /// </summary>
  /// <param name="lon">経度</param>
  /// <param name="lat">緯度</param>
  constructor(lon = 0, lat = 0) {
    this.m_lon = lon
    this.m_lat = lat
  }
}

/// <summary>
/// 初期ファイル情報クラス
/// </summary>
export class DefData {
  /// <summary>緯度経度座標X方向単位</summary>
  private m_dUnitX: number
  /// <summary>緯度経度座標Y方向単位</summary>
  private m_dUnitY: number
  /// <summary>緯度経度座標X方向オフセット</summary>
  private m_iOffsetLLX: number
  /// <summary>緯度経度座標Y方向オフセット</summary>
  private m_iOffsetLLY: number

  /// <summary>平面直角座標単位(m)</summary>
  private m_dUnitXY: number
  /// <summary>平面直角座標X方向オフセット</summary>
  private m_iOffsetXYX: number
  /// <summary>平面直角座標Y方向オフセット</summary>
  private m_iOffsetXYY: number

  /// <summary>矩形領域情報</summary>
  private m_AreaData: AreaData[]

  // #region "CONSTRUCTOR/DESTRUCTOR"

  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    this.m_dUnitXY = 1.0
    this.m_dUnitX = 0.0
    this.m_dUnitY = 0.0
    this.m_iOffsetXYX = 0
    this.m_iOffsetXYY = 0
    this.m_iOffsetLLX = 0
    this.m_iOffsetLLY = 0
    this.m_AreaData = new Array<AreaData>(19)
    this.setDefault()
  }

  // #endregion

  // #region "GETTER"

  /// <summary>単位(m)を取得</summary>
  /// <returns>単位(m)</returns>
  getUnitXY(): number {
    return this.m_dUnitXY
  }
  /// <summary>X方向単位を取得</summary>
  /// <returns>X方向単位</returns>
  getUnitX(): number {
    return this.m_dUnitX
  }
  /// <summary>Y方向単位を取得</summary>
  /// <returns>Y方向単位</returns>
  getUnitY(): number {
    return this.m_dUnitY
  }
  /// <summary>X方向オフセットを取得</summary>
  /// <returns>X方向オフセット</returns>
  getOffsetLLX(): number {
    return this.m_iOffsetLLX
  }
  /// <summary>Y方向オフセットを取得</summary>
  /// <returns>Y方向オフセット</returns>
  getOffsetLLY(): number {
    return this.m_iOffsetLLY
  }
  /// <summary>X方向オフセットを取得</summary>
  /// <returns>X方向オフセット</returns>
  getOffsetXYX(): number {
    return this.m_iOffsetXYX
  }
  /// <summary>Y方向オフセットを取得</summary>
  /// <returns>Y方向オフセット</returns>
  getOffsetXYY(): number {
    return this.m_iOffsetXYY
  }

  /// <summary>
  /// 対象緯度経度の系番号を取得
  /// </summary>
  /// <remarks>
  /// 対象系がなければ負値を返す
  /// </remarks>
  /// <param name="lon">経度</param>
  /// <param name="lat">緯度</param>
  /// <returns>系番号</returns>
  getKeiNum(lon: number, lat: number) {
    let iret = CCommon.ERROR_CODE
    for (let i = 0; i < 19; i++) {
      iret = this.m_AreaData[i].isInnerArea(lon, lat)
      if (iret !== CCommon.ERROR_CODE) break
    }
    return iret
  }

  // #endregion

  // #region "SETTER"

  /// <summary>
  /// 単位・オフセットを設定
  /// </summary>
  /// <param name="dUnitXY">単位(m)</param>
  /// <param name="iOffsetXYX">X方向オフセット></param>
  /// <param name="iOffsetXYY">Y方向オフセット></param>
  /// <param name="dUnitX">X方向単位</param>
  /// <param name="dUnitY">Y方向単位</param>
  /// <param name="iOffsetLLX">X方向オフセット></param>
  /// <param name="iOffsetLLY">Y方向オフセット></param>
  setUnitOffset(
    dUnitXY: number,
    iOffsetXYX: number,
    iOffsetXYY: number,
    dUnitX: number,
    dUnitY: number,
    iOffsetLLX: number,
    iOffsetLLY: number
  ): void {
    this.m_dUnitXY = dUnitXY
    this.m_iOffsetXYX = iOffsetXYX
    this.m_iOffsetXYY = iOffsetXYY
    this.m_dUnitX = dUnitX
    this.m_dUnitY = dUnitY
    this.m_iOffsetLLX = iOffsetLLX
    this.m_iOffsetLLY = iOffsetLLY
  }

  /// <summary>
  /// 単位・オフセットを設定
  /// </summary>
  /// <param name="dUnitXY">単位(m)</param>
  /// <param name="iOffsetXYX">X方向オフセット></param>
  /// <param name="iOffsetXYY">Y方向オフセット></param>
  setUnitOffsetXY(dUnitXY: number, iOffsetXYX: number, iOffsetXYY: number): void {
    this.m_dUnitXY = dUnitXY
    this.m_iOffsetXYX = iOffsetXYX
    this.m_iOffsetXYY = iOffsetXYY
  }

  /// <summary>
  /// 単位・オフセットを設定
  /// </summary>
  /// <param name="dUnitX">X方向単位</param>
  /// <param name="dUnitY">Y方向単位</param>
  /// <param name="iOffsetLLX">X方向オフセット></param>
  /// <param name="iOffsetLLY">Y方向オフセット></param>
  setUnitOffsetPOSLL(dUnitX: number, dUnitY: number, iOffsetLLX: number, iOffsetLLY: number) {
    this.m_dUnitX = dUnitX
    this.m_dUnitY = dUnitY
    this.m_iOffsetLLX = iOffsetLLX
    this.m_iOffsetLLY = iOffsetLLY
  }

  /// <summary>
  /// 矩形領域情報にデフォルト値をセット
  /// </summary>
  setDefault(): void {
    this.m_AreaData[0] = new AreaData(1, 128.3, 31.0, 130.0, 34.0)
    this.m_AreaData[1] = new AreaData(2, 130.0, 31.0, 132.0, 34.0)
    this.m_AreaData[2] = new AreaData(3, 130.3, 34.0, 133.3, 36.3)
    this.m_AreaData[3] = new AreaData(4, 132.0, 32.0, 135.1, 34.0)
    this.m_AreaData[4] = new AreaData(5, 133.3, 34.0, 135.1, 36.0)
    this.m_AreaData[5] = new AreaData(6, 135.1, 33.0, 136.3, 36.3)
    this.m_AreaData[6] = new AreaData(7, 136.3, 34.0, 137.3, 38.0)
    this.m_AreaData[7] = new AreaData(8, 137.3, 34.0, 139.0, 38.3)
    this.m_AreaData[8] = new AreaData(9, 139.0, 33.0, 141.3, 38.0)
    this.m_AreaData[9] = new AreaData(10, 139.0, 38.0, 142.3, 41.3)
    this.m_AreaData[10] = new AreaData(11, 139.0, 41.3, 141.0, 44.0)
    this.m_AreaData[11] = new AreaData(12, 141.0, 41.3, 143.0, 46.0)
    this.m_AreaData[12] = new AreaData(13, 143.0, 41.3, 148.0, 46.0)
    this.m_AreaData[13] = new AreaData(14, 141.0, 24.0, 143.0, 26.0)
    this.m_AreaData[14] = new AreaData(15, 126.3, 26.0, 131.0, 28.3)
    this.m_AreaData[15] = new AreaData(16, 122.3, 24.0, 126.0, 26.0)
    this.m_AreaData[16] = new AreaData(17, 131.0, 24.0, 132.0, 26.0)
    this.m_AreaData[17] = new AreaData(18, 140.3, 28.0, 136.0, 20.0)
    this.m_AreaData[18] = new AreaData(19, 154.0, 28.0, 143.0, 26.0)
  }

  /// <summary>
  /// 矩形領域情報を設定
  /// </summary>
  /// <param name="data">矩形領域情報</param>
  setAreaData(data: AreaData) {
    // デフォルトで設定した値を削除
    const idx = data.getKei() - 1
    if (this.m_AreaData[idx]) {
      const [kei = 0, lonBL = 0.0, latBL = 0.0, lonTR = 0.0, latTR = 0.0] = data.getParam()
      this.m_AreaData[idx] = new AreaData(kei, lonBL, latBL, lonTR, latTR)
    }
  }

  // #endregion
}

/// <summary>
/// 矩形座標クラス
/// </summary>
//internal class AreaData
export class AreaData {
  // 【リファクタリング】sealed修飾子をつけました（ttc馬場）
  /// <summary>系番号</summary>
  private m_keiNum: number
  /// <summary>矩形左下緯度経度</summary>
  private m_bottomLeft: CoordLL
  /// <summary>矩形右上緯度経度</summary>
  private m_topRight: CoordLL

  // #region "CONSTRUCTOR/DESTRUCTOR"

  /// <summary>
  /// コンストラクタ
  /// </summary>
  /// <param name="kei">系</param>
  /// <param name="lonBL">矩形左下経度</param>
  /// <param name="latBL">矩形左下緯度</param>
  /// <param name="lonTR">矩形右上経度</param>
  /// <param name="latTR">矩形右上緯度</param>
  constructor(kei: number, lonBL: number, latBL: number, lonTR: number, latTR: number) {
    this.m_keiNum = kei
    this.m_bottomLeft = new CoordLL(lonBL, latBL)
    this.m_topRight = new CoordLL(lonTR, latTR)
  }

  // #endregion

  // #region "SETTER"

  /// <summary>
  /// 系を設定
  /// </summary>
  /// <param name="kei">系</param>
  public setKei(kei: number): void {
    this.m_keiNum = kei
  }

  /// <summary>
  /// 矩形左下緯度経度を設定
  /// </summary>
  /// <param name="lon">経度</param>
  /// <param name="lat">緯度</param>
  public setCoordBL(lon: number, lat: number): void {
    if (this.m_bottomLeft == null) this.m_bottomLeft = new CoordLL(lon, lat)
  }

  /// <summary>
  /// 矩形右上緯度経度を設定
  /// </summary>
  /// <param name="lon">経度</param>
  /// <param name="lat">緯度</param>
  public setCoordTR(lon: number, lat: number): void {
    if (this.m_topRight == null) this.m_topRight = new CoordLL(lon, lat)
  }

  // #endregion

  // #region "GETTER"

  /// <summary>
  /// 系を取得
  /// </summary>
  /// <returns>系</returns>
  public getKei() {
    return this.m_keiNum
  }

  /// <summary>
  /// 系・矩形緯度経度を取得
  /// </summary>
  /// <param name="kei">系</param>
  /// <param name="lonBL">矩形左下経度</param>
  /// <param name="latBL">矩形左下緯度</param>
  /// <param name="lonTR">矩形右上経度</param>
  /// <param name="latTR">矩形右上緯度</param>
  public getParam(): [kei: number, lonBL: number, latBL: number, lonTR: number, latTR: number] {
    return [
      this.m_keiNum,
      this.m_bottomLeft.m_lon,
      this.m_bottomLeft.m_lat,
      this.m_topRight.m_lon,
      this.m_topRight.m_lat,
    ]
  }

  // #endregion

  /// <summary>
  /// 対象座標が矩形領域内にあるかどうか
  /// </summary>
  /// <remarks>
  /// 座標(lon, lat)が左下－右上矩形領域内にあるかどうか。
  /// あれば系番号を返し、なければ負値を返す。
  /// 但し、矩形に対して左・下辺は線上あり、右・上辺は線上なしとする。
  /// </remarks>
  /// <param name="lon">経度</param>
  /// <param name="lat">緯度</param>
  /// <returns></returns>
  public isInnerArea(lon: number, lat: number): number {
    // X方向に対するチェック
    if (lat < this.m_bottomLeft.m_lat || this.m_topRight.m_lat <= lat) return CCommon.ERROR_CODE

    // Y方向に対するチェック
    if (lon < this.m_bottomLeft.m_lon || this.m_topRight.m_lon <= lon) return CCommon.ERROR_CODE

    return this.m_keiNum
  }
}
