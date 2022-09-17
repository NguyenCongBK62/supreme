////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: 地図関連ユーティリティ
/// Description: 地図関連の共通処理を提供するクラス
///
////////////////////////////////////////////////////////////////

import CoordConv from "../../../commonlib/MainFunc"


//     /// <summary>
//     /// 地図関連ユーティリティ
//     /// </summary>
// 補正値
export const ADJUST_X = 10000000
export const ADJUST_Y = 10000000

/// <summary>
/// マッピング座標のX座標値を補正する
/// </summary>
/// <param name="x">マッピングX座標値</param>
/// <returns>補正後のマッピングX座標値</returns>
export function AdjustMappingX(x = 0): number {
  return (x ?? 0) + ADJUST_X
}

/// <summary>
/// マッピング座標のY座標値を補正する
/// </summary>
/// <param name="y">マッピングY座標値</param>
/// <returns>補正後のマッピングY座標値</returns>
export function AdjustMappingY(y = 0): number {
  return -(y ?? 0) + ADJUST_Y
}

/// <summary>
/// マッピング座標のX座標値補正の逆関数
/// </summary>
/// <param name="x">補正後のマッピングX座標値</param>
/// <returns>マッピングX座標値</returns>
export function UnAdjustMappingX(x: number) {
  return x - ADJUST_X
}

/// <summary>
/// マッピング座標のY座標値補正の逆関数
/// </summary>
/// <param name="y">補正後のマッピングY座標値</param>
/// <returns>マッピングY座標値</returns>
export function UnAdjustMappingY(y: number) {
  return -y + ADJUST_Y
}

/// <summary>
/// 座標変換クラスのオブジェクト
/// </summary>
const Cc: CoordConv = cc()

/// <summary>
/// 座標変換クラスの取得
/// </summary>
function cc(): CoordConv {
  const cc = new CoordConv()
  cc.initCoordConv('', '')
  cc.setUnitOffsetXY(0.1, 1525000, -2205000)
  return cc
}

/// <summary>
/// マッピング座標から緯度経度を求める
/// </summary>
/// <param name="x">マッピングX座標</param>
/// <param name="y">マッピングY座標</param>
export function XY2LL(x: number, y: number): [longitude?: number, latitude?: number] {
  const kei_num = 9
  return Cc.XY2LL(kei_num, x, y, 1, 1, 0.1)
}

// /// <summary>
// /// 緯度経度からマッピング座標を求める
// /// </summary>
// /// <param name="longitude">経度(度の実数)</param>
// /// <param name="latitude">緯度(度の実数)</param>
// export function LL2XY(longitude: number, latitude: number): [x?: number, y?: number] {
//   const kei_num = 9
//   return Cc.LL2XY(longitude, latitude, 1, 1, kei_num, 0.1)
// }

//         /// <summary>
//         /// 緯度経度からマッピング座標を求める
//         /// </summary>
//         /// <param name="longitude">経度(度分秒を連結した整数)</param>
//         /// <param name="latitude">緯度(度分秒を連結した整数)</param>
//         /// <param name="x">マッピングX座標</param>
//         /// <param name="y">マッピングY座標</param>
//         public static void LL2XY(int longitude, int latitude, ref int x, ref int y)
//         {
//             int a = (int)longitude / 10000;
//             int b = (int)((longitude - a * 10000) / 100);
//             int c = (int)((longitude - a * 10000) - b * 100);
//             double lon = a + b / 60.0 + c / 3600.0;

//             a = (int)latitude / 10000;
//             b = (int)((latitude - a * 10000) / 100);
//             c = (int)((latitude - a * 10000) - b * 100);
//             double lat = a + b / 60.0 + c / 3600.0;

//             LL2XY(lon, lat, ref x, ref y);
//         }

//         /// <summary>
//         /// データ系列に対応する凡例種別を取得する
//         /// </summary>
//         /// <param name="series">データ系列</param>
//         /// <returns>凡例種別</returns>
//         public static LegendType GetLegendTypeFromDataSeries(MapDataSeries series, bool isObservation)
//         {
//             switch (series)
//             {
//                 case MapDataSeries.Si:
//                     return isObservation ? LegendType.ObservationSi : LegendType.Si;
//                 case MapDataSeries.Gal:
//                     return LegendType.Gal;
//                 case MapDataSeries.Mpa:
//                     return LegendType.Mpa;
//                 case MapDataSeries.Mpb:
//                     return LegendType.Mpb;
//                 case MapDataSeries.Lp:
//                     return LegendType.Lp;
//                 case MapDataSeries.GovStop:
//                     return LegendType.Shutoff;
//                 case MapDataSeries.PatrolClose:
//                     return LegendType.PatrolClose;
//                 case MapDataSeries.PatrolOpen:
//                     return LegendType.PatrolOpen;
//                 case MapDataSeries.Tc:
//                     return LegendType.Tc;
//                 case MapDataSeries.LqAlarm:
//                     return LegendType.LqAlarm;
//                 case MapDataSeries.PowerFailure:
//                     return LegendType.PowerFailure;
//                 case MapDataSeries.WaterLevelAlarm:
//                     return LegendType.WaterLevelAlarm;
//                 case MapDataSeries.MpaDeltaP:
//                     return LegendType.MpaDeltaP;
//                 case MapDataSeries.MpbDeltaP:
//                     return LegendType.MpbDeltaP;
//                 case MapDataSeries.MpaDeltaPNow:
//                     return LegendType.MpaDeltaPNow;
//                 case MapDataSeries.MpbDeltaPNow:
//                     return LegendType.MpbDeltaPNow;
//                 default:
//                     return LegendType.None;
//             }
//         }

//         /// <summary>
//         /// 塗りつぶし系列に対応する凡例種別を取得する
//         /// </summary>
//         /// <param name="series">塗りつぶし系列</param>
//         /// <returns>凡例種別</returns>
//         public static LegendType GetLegendTypeFromFillSeries(MapFillSeries series, bool isObservation)
//         {
//             switch (series)
//             {
//                 case MapFillSeries.LpDmgL:
//                     return LegendType.LpDmg;
//                 case MapFillSeries.BldgDmgL:
//                     return LegendType.BldgDmg;
//                 case MapFillSeries.LpDmgS:
//                     return LegendType.LpDmgS;
//                 case MapFillSeries.BlockLp:
//                     return LegendType.BlockLp;
//                 case MapFillSeries.MeshLpDmg:
//                     return LegendType.LpDmgMesh;
//                 case MapFillSeries.MeshBldgDmg:
//                     return LegendType.BldgDmg;
//                 case MapFillSeries.MeshSi:
//                     //return isObservation ? LegendType.ObservationMeshSi : LegendType.MeshSi;
//                     // 見学モード時も、通常の凡例を表示する
//                     return LegendType.MeshSi;
//                 case MapFillSeries.MeshLqth:
//                     return LegendType.MeshLqth;
//                 case MapFillSeries.MeshSiArv:
//                     return LegendType.MeshSiArv;
//                 case MapFillSeries.MeshGt:
//                     return LegendType.MeshGt;
//                 case MapFillSeries.MeshPl:
//                 case MapFillSeries.MeshPlblock:
//                     return LegendType.MeshPl;
//                 default:
//                     return LegendType.None;
//             }
//         }

//         /// <summary>
//         /// データ系列に対応する観測点表示フラグのビット値を取得する
//         /// </summary>
//         /// <param name="series">データ系列</param>
//         /// <returns>観測点表示フラグのビット値</returns>
//         public static ObsFlags GetMaskFromDataSeries(MapDataSeries series)
//         {
//             switch (series)
//             {
//                 case MapDataSeries.Si:
//                     return ObsFlags.Si;
//                 case MapDataSeries.Gal:
//                     return ObsFlags.Gal;
//                 case MapDataSeries.Mpa:
//                     return ObsFlags.Mpa;
//                 case MapDataSeries.Mpb:
//                     return ObsFlags.Mpb;
//                 case MapDataSeries.Lp:
//                     return ObsFlags.Lp;
//                 case MapDataSeries.GovStop:
//                     return ObsFlags.GovStop;
//                 case MapDataSeries.PatrolClose:
//                     return ObsFlags.GovStop;
//                 case MapDataSeries.PatrolOpen:
//                     return ObsFlags.GovStop;
//                 case MapDataSeries.LqAlarm:
//                     return ObsFlags.LqAlarm;
//                 case MapDataSeries.PowerFailure:
//                     return ObsFlags.PowerFailure;
//                 case MapDataSeries.MpaDeltaP:
//                     return ObsFlags.Mpa;
//                 case MapDataSeries.MpbDeltaP:
//                     return ObsFlags.Mpb;
//                 case MapDataSeries.MpaDeltaPNow:
//                     return ObsFlags.Mpa;
//                 case MapDataSeries.MpbDeltaPNow:
//                     return ObsFlags.Mpb;
//                 default:
//                     return ObsFlags.None;
//             }
//         }

//         /// <summary>
//         /// 地図種別が属している地図グループを取得する
//         /// </summary>
//         /// <param name="mapType">地図種別</param>
//         /// <returns>地図グループ</returns>
//         public static MapGroup GetMapGroup(MapType mapType)
//         {
//             switch (mapType)
//             {
//                 case MapType.Obs:
//                 case MapType.KSensor:
//                 case MapType.Branch:
//                 case MapType.Ext:
//                 case MapType.LpDmg:
//                 case MapType.MpDmg:
//                 case MapType.GakanPatrol:
//                     return MapGroup.Normal;
//                 case MapType.BlockLp:
//                 case MapType.BlockDmg:
//                     return MapGroup.CheckSheet;
//                 case MapType.TrainingSetting:
//                     return MapGroup.TrainingSetting;
//                 default:
//                     return 0;
//             }
//         }
