// Coleta de métricas via Google Business Profile API

export interface GMBMetrics {
  visualizacoes_perfil: number;
  buscas_por_nome: number;
  buscas_por_categoria: number;
  cliques_ligar: number;
  cliques_rota: number;
  total_fotos: number;
  avaliacao_media: number;
  total_avaliacoes: number;
  avaliacoes_sem_resposta: number;
  coletado_em: string;
}

export async function coletarMetricasGMB(
  accessToken: string,
  locationName: string,
  periodo: { inicio: string; fim: string }
): Promise<GMBMetrics> {
  const baseUrl = 'https://businessprofileperformance.googleapis.com/v1';

  // Métricas de performance
  try {
    const metricsRes = await fetch(
      `${baseUrl}/${locationName}:fetchMultiDailyMetricsTimeSeries?` +
      `dailyMetric=BUSINESS_IMPRESSIONS_DESKTOP_MAPS&` +
      `dailyMetric=BUSINESS_IMPRESSIONS_MOBILE_MAPS&` +
      `dailyMetric=CALL_CLICKS&` +
      `dailyMetric=BUSINESS_DIRECTION_REQUESTS&` +
      `dailyRange.startDate.year=${periodo.inicio.split('-')[0]}&` +
      `dailyRange.startDate.month=${periodo.inicio.split('-')[1]}&` +
      `dailyRange.startDate.day=${periodo.inicio.split('-')[2]}&` +
      `dailyRange.endDate.year=${periodo.fim.split('-')[0]}&` +
      `dailyRange.endDate.month=${periodo.fim.split('-')[1]}&` +
      `dailyRange.endDate.day=${periodo.fim.split('-')[2]}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const metricsData = (await metricsRes.json()) as { multiDailyMetricTimeSeries?: Array<{ dailyMetric: string; timeSeries: { datedValues: Array<{ value: string }> } }> };

    // Somar totais por métrica
    const somMetrica = (nome: string) => {
      const serie = metricsData.multiDailyMetricTimeSeries?.find(
        (s) => s.dailyMetric === nome
      );
      return serie?.timeSeries?.datedValues?.reduce(
        (sum, v) => sum + (parseInt(v.value) || 0), 0
      ) || 0;
    };

    const visualizacoesMaps =
      somMetrica('BUSINESS_IMPRESSIONS_DESKTOP_MAPS') +
      somMetrica('BUSINESS_IMPRESSIONS_MOBILE_MAPS');

    return {
      visualizacoes_perfil: visualizacoesMaps,
      buscas_por_nome: 0,       // requer endpoint separado
      buscas_por_categoria: 0,  // requer endpoint separado
      cliques_ligar: somMetrica('CALL_CLICKS'),
      cliques_rota: somMetrica('BUSINESS_DIRECTION_REQUESTS'),
      total_fotos: 0,           // preencher via entrada manual por ora
      avaliacao_media: 0,       // preencher via entrada manual por ora
      total_avaliacoes: 0,
      avaliacoes_sem_resposta: 0,
      coletado_em: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Erro GMB:', error);
    return {
      visualizacoes_perfil: 0,
      buscas_por_nome: 0,
      buscas_por_categoria: 0,
      cliques_ligar: 0,
      cliques_rota: 0,
      total_fotos: 0,
      avaliacao_media: 0,
      total_avaliacoes: 0,
      avaliacoes_sem_resposta: 0,
      coletado_em: new Date().toISOString(),
    };
  }
}
