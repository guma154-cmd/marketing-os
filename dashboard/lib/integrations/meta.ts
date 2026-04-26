// Coleta de métricas via Meta Graph API
// Documentação: https://developers.facebook.com/docs/graph-api

export interface MetaMetrics {
  seguidores: number;
  ultimo_post_data: string;
  frequencia_posts_30d: number;
  alcance_medio: number;
  taxa_engajamento_media: number;
  top_posts: Array<{
    id: string;
    data: string;
    tipo: string;
    alcance: number;
    engajamento: number;
    curtidas: number;
    comentarios: number;
  }>;
  dados_demograficos?: {
    pais_top: string;
    faixa_etaria_top: string;
    genero_predominante: string;
  };
  coletado_em: string;
}

export async function coletarMetricasMeta(
  accessToken: string,
  instagramAccountId: string
): Promise<MetaMetrics> {
  const baseUrl = 'https://graph.facebook.com/v19.0';

  // 1. Seguidores atuais
  const perfilRes = await fetch(
    `${baseUrl}/${instagramAccountId}?fields=followers_count,media_count&access_token=${accessToken}`
  );
  const perfil = (await perfilRes.json()) as { followers_count: number };

  // 2. Últimos 30 posts
  const postsRes = await fetch(
    `${baseUrl}/${instagramAccountId}/media?fields=id,timestamp,media_type,like_count,comments_count&limit=30&access_token=${accessToken}`
  );
  const postsData = (await postsRes.json()) as { data: Array<{ id: string; timestamp: string; media_type: string; like_count: number; comments_count: number }> };
  const posts = postsData.data || [];

  // 3. Insights por post (alcance e engajamento)
  const postsComInsights = await Promise.all(
    posts.slice(0, 10).map(async (post) => {
      try {
        const insightRes = await fetch(
          `${baseUrl}/${post.id}/insights?metric=reach,engagement&access_token=${accessToken}`
        );
        const insight = (await insightRes.json()) as { data: Array<{ name: string; values: Array<{ value: number }> }> };
        const metrics = insight.data || [];
        const reach = metrics.find((m) => m.name === 'reach')?.values?.[0]?.value || 0;
        const engagement = metrics.find((m) => m.name === 'engagement')?.values?.[0]?.value || 0;
        return {
          id: post.id,
          data: post.timestamp,
          tipo: post.media_type,
          alcance: reach,
          engajamento: engagement,
          curtidas: post.like_count || 0,
          comentarios: post.comments_count || 0,
        };
      } catch {
        return {
          id: post.id,
          data: post.timestamp,
          tipo: post.media_type,
          alcance: 0,
          engajamento: 0,
          curtidas: post.like_count || 0,
          comentarios: post.comments_count || 0,
        };
      }
    })
  );

  // Calcular frequência (posts nos últimos 30 dias)
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
  const postsUltimos30d = posts.filter(
    (p) => new Date(p.timestamp) > trintaDiasAtras
  );

  // Calcular médias
  const alcanceMedio = postsComInsights.length > 0
    ? Math.round(postsComInsights.reduce((sum, p) => sum + p.alcance, 0) / postsComInsights.length)
    : 0;

  const taxaEngajamento = perfil.followers_count > 0 && alcanceMedio > 0
    ? parseFloat(((postsComInsights.reduce((sum, p) => sum + p.engajamento, 0) / postsComInsights.length) / perfil.followers_count * 100).toFixed(2))
    : 0;

  const ultimoPost = posts[0]?.timestamp || 'Sem posts';

  return {
    seguidores: perfil.followers_count || 0,
    ultimo_post_data: ultimoPost,
    frequencia_posts_30d: postsUltimos30d.length,
    alcance_medio: alcanceMedio,
    taxa_engajamento_media: taxaEngajamento,
    top_posts: postsComInsights.slice(0, 5),
    coletado_em: new Date().toISOString(),
  };
}
