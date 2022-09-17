import { CCommon, DefData } from './Common'
import { CCalcFunc } from './CalcFunc'

/// <summary>
/// 緯度経度変換DLLメインクラス
/// </summary>
export default class CoordConv {
  readonly TYPE_TKY = 1 // 【リファクタリング】読み取り専用にしました（ttc馬場）

  /// <summary>世界測地系パラメータ</summary>
  readonly TYPE_JGD = 2 // 【リファクタリング】読み取り専用にしました（ttc馬場）

  m_defData?: DefData // 定義ファイル情報

  m_cmnObj: CCommon // 共通
  m_cfObj: CCalcFunc // 飛田メソッド

  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    this.m_cmnObj = new CCommon()
    this.m_cfObj = new CCalcFunc()
  }

  /// <summary>初期処理</summary>
  /// <param name="fileName_ini">定義ファイルパス(必須)</param>
  /// <param name="fileName_par">パラメータファイルパス</param>
  /// <remarks>
  /// 定義ファイル情報を読み込みます。<br/>
  /// .NET版ではパラメータファイルは読み込みません。
  /// </remarks>
  /// <returns>
  /// True	: 定義ファイル情報の読み込みに成功<br/>
  /// False	: 定義ファイル情報の読み込みに失敗
  /// </returns>
  initCoordConv(fileName_ini: string, fileName_par: string): boolean {
    try {
      this.m_defData = new DefData()
      if (this.m_cmnObj.readIniXml(fileName_ini, this.m_defData)) return true
    } catch {}
    return false
  }

  /// <summary>終了処理</summary>
  /// <remarks>保持している定義ファイル情報を破棄します。</remarks>
  /// <returns>常にTrue</returns>
  endCoordConv(): boolean {
    if (this.m_defData) this.m_defData = undefined
    return true
  }

  // 			/// <summary>
  // 			/// 緯度経度座標→緯度経度（度）
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 緯度経度座標を指定測地系に従がって度単位の緯度経度に変換します。
  // 			/// </remarks>
  // 			/// <param name="posLon">I: 経度座標</param>
  // 			/// <param name="posLat">I: 緯度座標</param>
  // 			/// <param name="typeIn">I: 緯度経度座標の測地系パラメータ</param>
  // 			/// <param name="typeOut">I: 緯度経度の測地系パラメータ</param>
  // 			/// <param name="lon">O: 経度（度）</param>
  // 			/// <param name="lat">O: 緯度（度）</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool posLL2LL(double posLon, double posLat, int typeIn, int typeOut, ref double lon, ref double lat)
  // 			{
  // 				double lon1, lat1, lon2, lat2;

  // 				if(m_defData === null) return false;

  // 				// posLL→ LL(lon, lat)
  // 				lon1 = (posLon / 3600 * m_defData.getUnitX()) + (double)m_defData.getOffsetLLX();
  // 				lat1 = (posLat / 3600 * m_defData.getUnitY()) + (double)m_defData.getOffsetLLY();

  // 				if(typeIn !== typeOut)
  // 				{
  // 					lat2 = lat1;
  // 					lon2 = lon1;
  // 					// typeIn→typeOutに変換する
  // 					if(typeIn === 1 && typeOut==2)
  // 					{
  // 						// Tky→Jgd
  // 						if(!m_cfObj.Tky2Jgd(lat1, lon1, ref lat2, ref lon2)) return false;
  // 					}
  // 					else if(typeIn === 2 && typeOut==1)
  // 					{
  // 						// Jgd→Tky
  // 						if(!m_cfObj.Jgd2Tky(lat1, lon1, ref lat2, ref lon2)) return false;
  // 					}
  // 					lat1 = lat2;
  // 					lon1 = lon2;
  // 				}

  // 				lon = lon1;
  // 				lat = lat1;
  // 				return true;
  // 			}

  // 			/// <summary>
  // 			/// 緯度経度(度)→緯度経度座標
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 度単位の緯度経度を指定測地系に従がって緯度経度座標に変換します。
  // 			/// </remarks>
  // 			/// <param name="lon">I: 経度（度）</param>
  // 			/// <param name="lat">I: 緯度（度）</param>
  // 			/// <param name="typeIn">I: 緯度経度の測地系パラメータ</param>
  // 			/// <param name="typeOut">I: 緯度経度座標の測地系パラメータ</param>
  // 			/// <param name="posLon">O: 経度座標</param>
  // 			/// <param name="posLat">O: 緯度座標</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool LL2posLL(double lon, double lat, int typeIn, int typeOut, ref double posLon, ref double posLat)
  // 			{
  // 				double lon1, lat1, lon2, lat2;

  // 				if(m_defData === null) return false;

  // 				lat1 = lat;
  // 				lon1 = lon;

  // 				if(typeIn !== typeOut)
  // 				{
  // 					lat2 = lat1;
  // 					lon2 = lon1;
  // 					// typeIn→typeOutに変換する
  // 					if(typeIn === 1 && typeOut==2)
  // 					{// typeOut==2
  // 						// Tky→Jgd
  // 						if(!m_cfObj.Tky2Jgd(lat, lon, ref lat2, ref lon2)) return false;
  // 					}
  // 					else if(typeIn === 2 && typeOut==1)
  // 					{// typeIn==2, typeOut==1
  // 						// Jgd→Tky
  // 						if(!m_cfObj.Jgd2Tky(lat, lon, ref lat2, ref lon2)) return false;
  // 					}
  // 					lat1 = lat2;
  // 					lon1 = lon2;
  // 				}

  // 				// LL(Bout, Lout)→ posLL
  // 				posLon = (lon1 - (double)m_defData.getOffsetLLX()) * 3600 / m_defData.getUnitX();
  // 				posLat = (lat1 - (double)m_defData.getOffsetLLY()) * 3600 / m_defData.getUnitY();
  // 				return true;
  // 			}

  // 			/// <summary>
  // 			/// 緯度経度座標→系・平面直角座標
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 緯度経度座標を指定測地系に従がって平面直角座標に変換します。<br/>
  // 			/// 任意の系に出力したい場合は keiNum に系番号を渡してください。<br/>
  // 			/// keiNum = 0 の場合は自動で系を特定します。
  // 			/// </remarks>
  // 			/// <param name="posLon">I: 経度座標</param>
  // 			/// <param name="posLat">I: 緯度座標</param>
  // 			/// <param name="typeLL">I: 緯度経度座標の測地系パラメータ</param>
  // 			/// <param name="typeXY">I: 平面直角座標の測地系パラメータ</param>
  // 			/// <param name="keiNum">I/O: 系</param>
  // 			/// <param name="posX">O: X座標</param>
  // 			/// <param name="posY">O: Y座標</param>
  // 			/// <param name="unit">I: 平面直角座標の単位 (1m = 1.0)</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool posLL2XY(double posLon, double posLat, int typeLL, int typeXY, ref int keiNum, ref int posX, ref int posY, double unit)
  // 			{
  // 				// 1) posLL→ LL(lon, lat)
  // 				double lon = 0.0, lat = 0.0;
  // 				if(!posLL2LL(posLon, posLat, typeLL, typeLL, ref lon, ref lat))
  // 				{
  // 					return false;
  // 				}
  // 				// 2) LL → XY
  // 				if(!LL2XY(lon, lat, typeLL, typeXY, ref keiNum, ref posX, ref posY, unit))
  // 				{
  // 					return false;
  // 				}
  // 				return true;
  // 			}

  // 			/// <summary>
  // 			/// 系・平面直角座標→緯度経度座標
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 平面直角座標を指定測地系に従がって緯度経度座標に変換します。
  // 			/// </remarks>
  // 			/// <param name="keiNum">I: 系</param>
  // 			/// <param name="posX">I: X座標</param>
  // 			/// <param name="posY">I: Y座標</param>
  // 			/// <param name="typeXY">I: 平面直角座標の測地系パラメータ</param>
  // 			/// <param name="typeLL">I: 緯度経度座標の測地系パラメータ</param>
  // 			/// <param name="posLon">O: 経度座標</param>
  // 			/// <param name="posLat">O: 緯度座標</param>
  // 			/// <param name="unit">I: 平面直角座標の単位 (1m = 1.0)</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool XY2posLL(int keiNum, int posX, int posY, int typeXY, int typeLL, ref double posLon, ref double posLat, double unit)
  // 			{
  // 				// XY(posX, posY) → LL(Bout, Lout)
  // 				double Bout = 0.0, Lout = 0.0;
  // 				if(!XY2LL(keiNum, posX, posY, typeXY, typeLL, ref Lout, ref Bout, unit))
  // 				{
  // 					return false;
  // 				}
  // 				// LL(Bout, Lout)→ posLL
  // 				if(!LL2posLL(Lout, Bout, typeLL, typeLL, ref posLon, ref posLat))
  // 				{
  // 					return false;
  // 				}
  // 				return true;
  // 			}

  // 			/// <summary>
  // 			/// 緯度経度(度)→系・平面直角座標
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 度単位の緯度経度を指定測地系に従がって平面直角座標に変換します。<br/>
  // 			/// 任意の系に出力したい場合は keiNum に系番号を渡してください。<br/>
  // 			/// keiNum = 0 の場合は自動で系を特定します。
  // 			/// </remarks>
  // 			/// <param name="lon">I: 経度</param>
  // 			/// <param name="lat">I: 緯度</param>
  // 			/// <param name="typeLL">I: 緯度経度の測地系パラメータ</param>
  // 			/// <param name="typeXY">I: 平面直角座標の測地系パラメータ</param>
  // 			/// <param name="keiNum">I/O: 系</param>
  // 			/// <param name="posX">O: X座標</param>
  // 			/// <param name="posY">O: Y座標</param>
  // 			/// <param name="unit">I: 平面直角座標の単位 (1m = 1.0)</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool LL2XY(double lon, double lat, int typeLL, int typeXY, ref int keiNum, ref int posX, ref int posY, double unit)
  // 			{
  // 				if(m_defData === null) return false;

  // 				// typeLL測地系の緯度経度(posLon, posLat)を,単位unitのkeiNum系平面直角座標(posX, posY)に変換する
  // 				// LL(lon, lat)から対象の系を求める

  // 				/* 04.11.12 系を指定できるよう修正 */
  // 				int kei = 0;
  // 				int tmpKei = keiNum;
  // 				if (tmpKei !== 0 )
  // 				{
  // 					kei = tmpKei;
  // 				}
  // 				else
  // 				{
  // 					kei = m_defData.getKeiNum(lon, lat);
  // 				}
  // 				if(0 < kei && kei < 20)
  // 				{
  // 					keiNum = kei;
  // 				}
  // 				else
  // 				{
  // 					return false;
  // 				}

  // 				// LL(lon, lat)をtypeLL→typeXYに変換する
  // 				if(typeLL !== typeXY)
  // 				{
  // 					double lon2, lat2;
  // 					lat2 = lat;
  // 					lon2 = lon;
  // 					if(typeLL === 1 && typeXY === 2)
  // 					{// typeXY==2
  // 						// Tky→Jgd
  // 						if(!m_cfObj.Tky2Jgd(lat, lon, ref lat2, ref lon2)) return false;
  // 					}
  // 					else if(typeLL === 2 && typeXY === 1)
  // 					{// typeLL==2, typeXY==1
  // 						// Jgd→Tky
  // 						if(!m_cfObj.Jgd2Tky(lat, lon, ref lat2, ref lon2)) return false;
  // 					}
  // 					lat = lat2;
  // 					lon = lon2;
  // 				}
  // 				// LL(lon, lat)を2)で求めた系の平面直角座標(posX, posY)に変換する
  // 				double Xout = 0.0, Yout = 0.0;
  // 				m_cfObj.doCalcBl2xyFile(kei, typeXY - 1, lat, lon, ref Yout, ref Xout);
  // 				// 求めた平面直角座標(posX, posY)はm単位なので、unitに合わせる
  // 				int pmx = 1, pmy = 1;
  // 				if(Xout < 0) pmx = -1;
  // 				posX = (int)(Xout / unit + 0.5 * pmx) + m_defData.getOffsetXYX();
  // 				if(Yout < 0) pmy = -1;
  // 				posY = (int)(Yout / unit + 0.5 * pmy) + m_defData.getOffsetXYY();

  // 				return true;
  // 			}

  /// <summary>
  /// 系・平面直角座標→緯度経度(度)
  /// </summary>
  /// <remarks>
  /// 平面直角座標を指定測地系に従がって度単位の緯度経度に変換します。
  /// </remarks>
  /// <param name="keiNum">I: 系</param>
  /// <param name="posX">I: X座標</param>
  /// <param name="posY">I: Y座標</param>
  /// <param name="typeXY">I: 平面直角座標の測地系パラメータ</param>
  /// <param name="typeLL">I: 緯度経度の測地系パラメータ</param>
  /// <param name="unit">I: 平面直角座標の単位 (1m = 1.0)</param>
  /// <returns>
  /// [lat, lng]	: 座標変換に成功<br/>
  /// []	: 座標変換に失敗
  /// </returns>
  XY2LL(
    keiNum: number,
    posX: number,
    posY: number,
    typeXY: number,
    typeLL: number,
    unit: number
  ): [number?, number?] {
    if (!this.m_defData) return []

    const pX = posX - this.m_defData.getOffsetXYX()
    const pY = posY - this.m_defData.getOffsetXYY()

    // typeXY測地系,単位unitのkeiNum系平面直角座標(posX, posY)を
    // 緯度経度座標に変換する

    // XY(posX, posY) → LL(Bout, Lout)

    if (keiNum <= 0 || keiNum >= 20) return []

    const [lng = 0.0, lat = 0.0] = this.m_cfObj.doCalcXy2blFile(
      keiNum,
      typeXY - 1,
      pY * unit,
      pX * unit
    )
    // 2.5) LL(lon, lat)をtypeXY→typeLLに変換する
    if (typeXY !== typeLL) {
      if (typeXY === 1 && typeLL === 2) {
        // typeXY==2
        // Tky→Jgd
        return this.m_cfObj.Tky2Jgd(lat, lng)
      } else if (typeXY === 2 && typeLL === 1) {
        // typeLL==2, typeXY==1
        // Jgd→Tky
        return this.m_cfObj.Jgd2Tky(lat, lng)
      }
    }
    return [lng, lat]
  }

  // 		#region "unit指定なし"
  // 			/*
  // 			 * 初期設定ファイル(initCoordConvで指定)で読込んだ単位情報を利用します。
  // 			 * これまで使用されていなかった<unit>タグによる平面直角座標単位も反映しました。
  // 			 * 初期設定ファイルの情報を別途設定する場合は
  // 			 * setUnitOffset, setUnitOffsetXY, setUnitOffsetPOSLLをCallして下さい。
  // 			 * ('08/08/20) NSS
  // 			 */
  // 			/// <summary>
  // 			/// 緯度経度座標→系・平面直角座標
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 緯度経度座標を指定測地系に従がって平面直角座標に変換します。<br/>
  // 			/// 任意の系に出力したい場合は keiNum に系番号を渡してください。<br/>
  // 			/// keiNum = 0 の場合は自動で系を特定します。
  // 			/// </remarks>
  // 			/// <param name="posLon">I: 経度座標</param>
  // 			/// <param name="posLat">I: 緯度座標</param>
  // 			/// <param name="typeLL">I: 緯度経度座標の測地系パラメータ</param>
  // 			/// <param name="typeXY">I: 平面直角座標の測地系パラメータ</param>
  // 			/// <param name="keiNum">I/O: 系</param>
  // 			/// <param name="posX">O: X座標</param>
  // 			/// <param name="posY">O: Y座標</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool posLL2XY(double posLon, double posLat, int typeLL, int typeXY, ref int keiNum, ref int posX, ref int posY)
  // 			{
  // 				return posLL2XY(posLon, posLat, typeLL, typeXY, ref keiNum, ref posX, ref posY, m_defData.getUnitXY());
  // 			}

  // 			/// <summary>
  // 			/// 系・平面直角座標→緯度経度座標
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 平面直角座標を指定測地系に従がって緯度経度座標に変換します。
  // 			/// </remarks>
  // 			/// <param name="keiNum">I: 系</param>
  // 			/// <param name="posX">I: X座標</param>
  // 			/// <param name="posY">I: Y座標</param>
  // 			/// <param name="typeXY">I: 平面直角座標の測地系パラメータ</param>
  // 			/// <param name="typeLL">I: 緯度経度座標の測地系パラメータ</param>
  // 			/// <param name="posLon">O: 経度座標</param>
  // 			/// <param name="posLat">O: 緯度座標</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool XY2posLL(int keiNum, int posX, int posY, int typeXY, int typeLL, ref double posLon, ref double posLat)
  // 			{
  // 				return XY2posLL(keiNum, posX, posY, typeXY, typeLL, ref posLon, ref posLat, m_defData.getUnitXY());
  // 			}

  // 			/// <summary>
  // 			/// 緯度経度(度)→系・平面直角座標
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 度単位の緯度経度を指定測地系に従がって平面直角座標に変換します。<br/>
  // 			/// 任意の系に出力したい場合は keiNum に系番号を渡してください。<br/>
  // 			/// keiNum = 0 の場合は自動で系を特定します。
  // 			/// </remarks>
  // 			/// <param name="lon">I: 経度</param>
  // 			/// <param name="lat">I: 緯度</param>
  // 			/// <param name="typeLL">I: 緯度経度の測地系パラメータ</param>
  // 			/// <param name="typeXY">I: 平面直角座標の測地系パラメータ</param>
  // 			/// <param name="keiNum">I/O: 系</param>
  // 			/// <param name="posX">O: X座標</param>
  // 			/// <param name="posY">O: Y座標</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool LL2XY(double lon, double lat, int typeLL, int typeXY, ref int keiNum, ref int posX, ref int posY)
  // 			{
  // 				return LL2XY(lon, lat, typeLL, typeXY, ref keiNum, ref posX, ref posY, m_defData.getUnitXY());
  // 			}

  // 			/// <summary>
  // 			/// 系・平面直角座標→緯度経度(度)
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 平面直角座標を指定測地系に従がって度単位の緯度経度に変換します。
  // 			/// </remarks>
  // 			/// <param name="keiNum">I: 系</param>
  // 			/// <param name="posX">I: X座標</param>
  // 			/// <param name="posY">I: Y座標</param>
  // 			/// <param name="typeXY">I: 平面直角座標の測地系パラメータ</param>
  // 			/// <param name="typeLL">I: 緯度経度の測地系パラメータ</param>
  // 			/// <param name="lon">O: 経度</param>
  // 			/// <param name="lat">O: 緯度</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool XY2LL(int keiNum, int posX, int posY, int typeXY, int typeLL, ref double lon, ref double lat)
  // 			{
  // 				return XY2LL(keiNum, posX, posY, typeXY, typeLL, ref lon, ref lat, m_defData.getUnitXY());
  // 			}

  // 		#endregion

  // 		#region "単位・オフセット設定"
  // 			/// <summary>
  // 			/// 単位・オフセット設定(平面直角座標・緯度経度座標)
  // 			/// </summary>
  // 			/// <param name="unit">単位</param>
  // 			/// <param name="offset_x">X方向オフセット</param>
  // 			/// <param name="offset_y">Y方向オフセット</param>
  // 			/// <param name="unit_x">X方向単位</param>
  // 			/// <param name="unit_y">Y方向単位</param>
  // 			/// <param name="offset_plx">X方向オフセット</param>
  // 			/// <param name="offset_ply">Y方向オフセット</param>
  // 			public void setUnitOffset(double unit, int offset_x, int offset_y, double unit_x, double unit_y, int offset_plx, int offset_ply)
  // 			{
  // 				if(m_defData === null) return ;
  // 				m_defData.setUnitOffset(unit, offset_x, offset_y, unit_x, unit_y, offset_plx, offset_ply);
  // 			}

  /// <summary>
  /// 単位・オフセット設定(平面直角座標)
  /// </summary>
  /// <param name="unit">単位</param>
  /// <param name="offset_x">X方向オフセット</param>
  /// <param name="offset_y">Y方向オフセット</param>
  setUnitOffsetXY(unit: number, offset_x: number, offset_y: number) {
    if (!this.m_defData) return
    this.m_defData.setUnitOffsetXY(unit, offset_x, offset_y)
  }

  // 			/// <summary>
  // 			/// 単位・オフセット設定(緯度経度座標)
  // 			/// </summary>
  // 			/// <param name="unit_x">X方向単位</param>
  // 			/// <param name="unit_y">Y方向単位</param>
  // 			/// <param name="offset_plx">X方向オフセット</param>
  // 			/// <param name="offset_ply">Y方向オフセット</param>
  // 			public void setUnitOffsetPOSLL(double unit_x, double unit_y, int offset_plx, int offset_ply)
  // 			{
  // 				if(m_defData === null) return ;
  // 				m_defData.setUnitOffsetPOSLL(unit_x, unit_y, offset_plx, offset_ply);
  // 			}
  // 		#endregion

  // 			/// <summary>
  // 			/// 緯度経度（度）の測地系変換
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 度単位の緯度経度の測地系を相互変換（日本測地系←→世界測地系）します。
  // 			/// </remarks>
  // 			/// <param name="typeIn">I: 元の測地系パラメータ</param>
  // 			/// <param name="lonIn">I: 経度</param>
  // 			/// <param name="latIn">I: 緯度</param>
  // 			/// <param name="typeOut">I: 変換する測地系パラメータ</param>
  // 			/// <param name="lonOut">O: 経度</param>
  // 			/// <param name="latOut">O: 緯度</param>
  // 			/// <returns>
  // 			/// True	: 座標変換に成功<br/>
  // 			/// False	: 座標変換に失敗
  // 			/// </returns>
  // 			public bool TkyLLJgd(int typeIn, double lonIn, double latIn, int typeOut, ref double lonOut, ref double latOut)
  // 			{
  // 				if(typeIn === 1 && typeOut === 2)
  // 				{ // Tky2Jgd
  // 					return m_cfObj.Tky2Jgd(latIn, lonIn, ref latOut, ref lonOut);
  // 				}
  // 				else if(typeIn === 2 && typeOut === 1)
  // 				{ // Jgd2Tky
  // 					return m_cfObj.Jgd2Tky(latIn,lonIn, ref latOut, ref lonOut);
  // 				}
  // 				latOut = latIn;
  // 				lonOut = lonIn;
  // 				return true;
  // 			}

  // 			/// <summary>
  // 			/// 緯度経度座標2点間の距離
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 緯度経度座標の2点間の距離を算出します。
  // 			/// </remarks>
  // 			/// <param name="posLon1">I: 点Aの経度座標</param>
  // 			/// <param name="posLat1">I: 点Aの緯度座標</param>
  // 			/// <param name="posLon2">I: 点Bの経度座標</param>
  // 			/// <param name="posLat2">I: 点Bの緯度座標</param>
  // 			/// <param name="typeLL">緯度経度座標の測地系パラメータ</param>
  // 			/// <param name="unit">距離の単位（1m = 1.0）</param>
  // 			/// <returns>
  // 			/// double	: 点A-B間の距離<br/>
  // 			/// Exceptionが発生した場合は-1.0が返ります。
  // 			/// </returns>
  // 			public double getPosLLDist(double posLon1, double posLat1, double posLon2, double posLat2, int typeLL, double unit)
  // 			{
  // 				try
  // 				{
  // 					/* 系が異なる2点間の距離を求められるよう修正 */
  // 					double lon1 = 0.0, lat1 = 0.0, lon2 = 0.0, lat2 = 0.0;
  // 					// 緯度経度座標を緯度経度に変換
  // 					posLL2LL(posLon1, posLat1, typeLL, typeLL, ref lon1, ref lat1);
  // 					posLL2LL(posLon2, posLat2, typeLL, typeLL, ref lon2, ref lat2);
  // 					// 緯度経度間の距離(m)を算出
  // 					double len = m_cfObj.getLLLength(typeLL, lon1, lat1, lon2, lat2);

  // 					return (len / unit);
  // 				}
  // 				catch
  // 				{
  // 				}
  // 				return -1.0;
  // 			}

  // 			/// <summary>
  // 			/// 緯度経度方向の長さ(m)
  // 			/// </summary>
  // 			/// <remarks>
  // 			/// 中心緯度経度座標、長さ(m)を指定し、その長さが<br/>
  // 			/// 緯度経度方向それぞれに対してどれだけの長さになるかを算出します。
  // 			/// </remarks>
  // 			/// <param name="posLon">I: 中心の経度座標</param>
  // 			/// <param name="posLat">I: 中心の緯度座標</param>
  // 			/// <param name="type">I: 測地系パラメータ</param>
  // 			/// <param name="len">I: 長さ</param>
  // 			/// <param name="lenLon">O: 経度方向の長さ</param>
  // 			/// <param name="lenLat">O: 緯度方向の長さ</param>
  // 			/// <returns>
  // 			/// True	: 長さ取得に成功<br/>
  // 			/// False	: 長さ取得に失敗
  // 			/// </returns>
  // 			public bool getLength(double posLon, double posLat, int type, int len, ref double lenLon, ref double lenLat)
  // 			{
  // 				/*
  // 				D=sqrt((M*dP)*(M*dP)+(N*cos(P)*dR)*(N*cos(P)*dR))
  // 				D: ２点間の距離(m)
  // 				P: ２点の平均緯度
  // 				dP: ２点の緯度差
  // 				dR: ２点の経度差
  // 				M: 子午線曲率半径
  // 				N: 卯酉線曲率半径
  // 				M=6334834/sqrt((1-0.006674*sin(P)*sin(P))^3)
  // 				N=6377397/sqrt(1-0.006674*sin(P)*sin(P))

  // 				1)基点となる座標（中心緯度経度座標）から緯度経度を求める
  // 				2)X,Yそれぞれの方向に対して任意の長さ(m)地点の緯度経度を求める
  // 				3)緯度経度を緯度経度座標に変換し、中心緯度経度座標との差＝長さ（緯度経度座標）を求める
  // 				*/

  // 				int keiNum, posX = 0, posY = 0, tmpX, tmpY;
  // 				double tmpLon = 0.0, tmpLat = 0.0;
  // 				keiNum = 0;
  // 				if(!posLL2XY(posLon, posLat, type, type, ref keiNum, ref posX, ref posY, 1.0))
  // 				{
  // 					return false;
  // 				}
  // 				// X方向
  // 				tmpX = posX + len;
  // 				if(!XY2posLL(keiNum, tmpX, posY, type, type, ref tmpLon, ref tmpLat, 1.0))
  // 				{
  // 					return false;
  // 				}
  // 				lenLon = tmpLon > posLon ? tmpLon - posLon: posLon - tmpLon;
  // 				// Y方向
  // 				tmpY = posY + len;
  // 				if(!XY2posLL(keiNum, posX, tmpY, type, type, ref tmpLon, ref tmpLat, 1.0))
  // 				{
  // 					return false;
  // 				}
  // 				lenLat = tmpLat > posLat ? tmpLat - posLat: posLat - tmpLat;
  // 				return true;
  // 			}

  // 		// 【リファクタリング】
  // 		// Disposeパターンにして、クライアントC#アプリからusing構文を利用可能にしました（ttc馬場）
  // 		#region IDisposable メンバ
  // 		/// <summary>
  // 		///
  // 		/// </summary>
  // 		public void Dispose()
  // 		{
  // 			if ( m_defData!=null )
  // 			{
  // 				this.endCoordConv();
  // 			}
  // 		}
  // 		#endregion
  // 		}
}
