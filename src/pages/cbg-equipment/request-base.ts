// 奇袭2.0以上的法伤法爆玉魄
let request1 = `
curl 'https://xyq-m.cbg.163.com/cgi-bin/recommend.py?client_type=h5&act=recommd_by_role' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'cbg-request-id: 019BBAA0-C376-936B-47B3-496B29949228' \
  -H 'cbg-safe-code: z85DXTm0' \
  -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
  -b 'login_id=764bc0e3-f05b-11f0-8eba-d5be5a249e9a; _flow_group_v2=g67; fingerprint=7wRIGHFEYAWhHAukgzRX53iO; NTES_CMT_USER_INFO=1221329938%7C%E6%9C%89%E6%80%81%E5%BA%A6%E7%BD%91%E5%8F%8B18P0gi%7Chttp%3A%2F%2Fcms-bucket.nosdn.127.net%2F2018%2F08%2F13%2F078ea9f65d954410b62a52ac773875a1.jpeg%7Cfalse%7CZmVpbnZseWQwM0AxNjMuY29t; timing_user_id=time_a0V4fxNgAM; trace_session_id=019B8701-C6B5-8B00-04E8-586EE96A68F8; _external_mark=cbgcb; _nietop_foot=%u68A6%u5E7B%u897F%u6E38%u7535%u8111%u7248%7Cxyq.163.com; reco_sid=LzWITK5-Hx6fvuyOMSMVMSuZWQ00w0eKaw9vhp1D; NTES_P_UTID=osVT0pNm8OffO7UVfZ8KijENqxkxr7Tm|1768361146; NTES_SESS=pMH_tdXrShfS9IQcnz5LJ1w.RQ35eliDbtvMr7Mu_XXWrpHffhdEDS3aybzjcFseNZ_gx6haGyXNBluJLzaZLIwBM9EpUUpG1wHeoP8EpxgnXec_Djln4gMsvGW5hWqaCEXCXHsgS_HJr7lWcHTFLbVP0rESIzWtsn5_TJZPlkAEEQf2pzd6Q0EV1nU5laCo9vqeB46Hj8QufVUZ2LYXfzvk0; NTES_PASSPORT=Kt5uqVh7nt2MABhFCCw6z6YGGH23dGbHPA39OKkPAgYRY23kkcgVryNuxaeISCdnAEOy_XYmSI8PHEMaaQAyh2pGZAKpRr0kc3CfNQpYY.dLTwX_QOMZKVs_VhRqJJrTh8sqJwzJe0tE3oYuN1szhAraoa7AJN2wUxPOYccrUgs.Oj5CoVQVfP4EHUSyukUi3; S_INFO=1768361146|0|2&70##|m15168766725; P_INFO=m15168766725@163.com|1768361146|1|cbg|00&99|zhj&1767008720&xyq#zhj&330100#10#0#0|&0|cbg&xyq_qrcode|m15168766725@163.com; sid=v2.s.DkFocb6KSPbe64sYkguQCFrIE68K8lpN0zS9EziZAFHfW22c; urs_share_login_token=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; urs_share_login_token_h5=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; last_login_serverid=94; last_login_roleid=30067162; serverid_share_login_token_h5=94$e779889e76aa32e34fa439194608aeba; is_log_active_stat=1; transmit_info=%7B%22time%22%3A1768362385583%2C%22bs%22%3A%7B%22ticket_id%22%3A%2200_30628_1768362385583%22%2C%22bd_id%22%3A%7B%7D%7D%7D' \
  -H 'origin: https://xyq-m.cbg.163.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://xyq-m.cbg.163.com/cgi/mweb/pl?order_by=price%20ASC&cross_buy_serverid=94&search_type=yupo_search&base_attrs1=%7B%22203%22%3A%221%22%7D&base_attrs2=%7B%22206%22%3A%221%22%7D&minghun_effect=%7B%221%22%3A%2220%22%7D&refer_sn=019BBAA0-5C2E-91E0-FFA6-BB2DFD13D5C3' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1' \
  -H 'x-requested-with: XMLHttpRequest' \
  --data-raw 'count=15&view_loc=search_cond%7Ctag_key%3A%7B%7D&order_by=price+ASC&cross_buy_serverid=94&search_type=yupo_search&base_attrs1=%7B%22203%22%3A%221%22%7D&base_attrs2=%7B%22206%22%3A%221%22%7D&minghun_effect=%7B%221%22%3A%2220%22%7D&refer_sn=019BBAA0-5C2E-91E0-FFA6-BB2DFD13D5C3&page=1&exter=cbgcb&page_session_id=019BBA89-CF2E-A919-5892-92900C07B73C&traffic_trace=%7B%22field_id%22%3A%22%22%2C%22content_id%22%3A%22%22%7D&exposed_scene_id=1768362656630-7e2fb246'
`

// 防御法防奇袭1.7的玉魄
let request2 = `
curl 'https://xyq-m.cbg.163.com/cgi-bin/recommend.py?client_type=h5&act=recommd_by_role' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'cbg-request-id: 019BBAA2-6EFF-F9AF-3D3B-E8DAD866843A' \
  -H 'cbg-safe-code: z85DXTm0' \
  -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
  -b 'login_id=764bc0e3-f05b-11f0-8eba-d5be5a249e9a; _flow_group_v2=g67; fingerprint=7wRIGHFEYAWhHAukgzRX53iO; NTES_CMT_USER_INFO=1221329938%7C%E6%9C%89%E6%80%81%E5%BA%A6%E7%BD%91%E5%8F%8B18P0gi%7Chttp%3A%2F%2Fcms-bucket.nosdn.127.net%2F2018%2F08%2F13%2F078ea9f65d954410b62a52ac773875a1.jpeg%7Cfalse%7CZmVpbnZseWQwM0AxNjMuY29t; timing_user_id=time_a0V4fxNgAM; trace_session_id=019B8701-C6B5-8B00-04E8-586EE96A68F8; _external_mark=cbgcb; _nietop_foot=%u68A6%u5E7B%u897F%u6E38%u7535%u8111%u7248%7Cxyq.163.com; reco_sid=LzWITK5-Hx6fvuyOMSMVMSuZWQ00w0eKaw9vhp1D; NTES_P_UTID=osVT0pNm8OffO7UVfZ8KijENqxkxr7Tm|1768361146; NTES_SESS=pMH_tdXrShfS9IQcnz5LJ1w.RQ35eliDbtvMr7Mu_XXWrpHffhdEDS3aybzjcFseNZ_gx6haGyXNBluJLzaZLIwBM9EpUUpG1wHeoP8EpxgnXec_Djln4gMsvGW5hWqaCEXCXHsgS_HJr7lWcHTFLbVP0rESIzWtsn5_TJZPlkAEEQf2pzd6Q0EV1nU5laCo9vqeB46Hj8QufVUZ2LYXfzvk0; NTES_PASSPORT=Kt5uqVh7nt2MABhFCCw6z6YGGH23dGbHPA39OKkPAgYRY23kkcgVryNuxaeISCdnAEOy_XYmSI8PHEMaaQAyh2pGZAKpRr0kc3CfNQpYY.dLTwX_QOMZKVs_VhRqJJrTh8sqJwzJe0tE3oYuN1szhAraoa7AJN2wUxPOYccrUgs.Oj5CoVQVfP4EHUSyukUi3; S_INFO=1768361146|0|2&70##|m15168766725; P_INFO=m15168766725@163.com|1768361146|1|cbg|00&99|zhj&1767008720&xyq#zhj&330100#10#0#0|&0|cbg&xyq_qrcode|m15168766725@163.com; sid=v2.s.DkFocb6KSPbe64sYkguQCFrIE68K8lpN0zS9EziZAFHfW22c; urs_share_login_token=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; urs_share_login_token_h5=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; last_login_serverid=94; last_login_roleid=30067162; serverid_share_login_token_h5=94$e779889e76aa32e34fa439194608aeba; is_log_active_stat=1; transmit_info=%7B%22time%22%3A1768362385583%2C%22bs%22%3A%7B%22ticket_id%22%3A%2200_30628_1768362385583%22%2C%22bd_id%22%3A%7B%7D%7D%7D' \
  -H 'origin: https://xyq-m.cbg.163.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://xyq-m.cbg.163.com/cgi/mweb/pl?order_by=price%20ASC&cross_buy_serverid=94&search_type=yupo_search&base_attrs1=%7B%22102%22%3A%221%22%7D&base_attrs2=%7B%22103%22%3A%221%22%7D&minghun_effect=%7B%221%22%3A%2217%22%7D&refer_sn=019BBAA2-0166-1A61-6595-2888E80256A5' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1' \
  -H 'x-requested-with: XMLHttpRequest' \
  --data-raw 'count=15&view_loc=search_cond%7Ctag_key%3A%7B%7D&order_by=price+ASC&cross_buy_serverid=94&search_type=yupo_search&base_attrs1=%7B%22102%22%3A%221%22%7D&base_attrs2=%7B%22103%22%3A%221%22%7D&minghun_effect=%7B%221%22%3A%2217%22%7D&refer_sn=019BBAA2-0166-1A61-6595-2888E80256A5&page=1&exter=cbgcb&page_session_id=019BBA89-CF2E-A919-5892-92900C07B73C&traffic_trace=%7B%22field_id%22%3A%22%22%2C%22content_id%22%3A%22%22%7D&exposed_scene_id=1768362766079-b3f81c5c'
`

// 根据base Request ,完成接口请求
function requestBase (baseRequest: string): Promise<any> {
  // 1. 提取URL
  const urlMatch = baseRequest.match(/curl\s+'([^']+)'/);
  if (!urlMatch) {
    throw new Error('无法从curl命令中提取URL');
  }
  const url = urlMatch[1];

  // 2. 提取请求头
  const headers: Record<string, string> = {};
  const headerMatches = baseRequest.match(/-H\s+'([^']+)'/g) || [];
  headerMatches.forEach(headerStr => {
    const [name, value] = headerStr.replace(/^-H\s+'/, '').replace(/'$/, '').split(': ');
    if (name && value) {
      headers[name] = value;
    }
  });

  // 3. 提取Cookie
  const cookieMatch = baseRequest.match(/-b\s+'([^']+)'/);
  if (cookieMatch) {
    headers['Cookie'] = cookieMatch[1];
  }

  // 4. 提取请求体
  const bodyMatch = baseRequest.match(/--data-raw\s+'([^']+)'/);
  const body = bodyMatch ? bodyMatch[1] : null;

  // 5. 设置请求选项
  const options: RequestInit = {
    method: body ? 'POST' : 'GET',
    headers,
    credentials: 'include',
  };

  if (body) {
    options.body = body;
  }

  // 6. 发送请求
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP错误! 状态码: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('请求失败:', error);
      throw error;
    });
}

// 示例用法
export async function fetchEquipmentData () {
  try {
    const data = await requestBase(request4);
    console.log('请求成功:', data);
    return data;
  } catch (error) {
    console.error('请求失败:', error);
    return null;
  }
}

// 初防230的特技男衣服
let request3 = `
curl ^"https://xyq-m.cbg.163.com/cgi/api/get_mobile_bind_info?client_type=h5^&exter=cbgcb^&page_session_id=019BC0E3-4C2B-CCE4-00DD-FF4E47867E48^&traffic_trace=^%^7B^%^22field_id^%^22^%^3A^%^22f_equip_list^%^22^%^2C^%^22content_id^%^22^%^3A^%^22c_all_list^%^22^%^7D^" ^
  -H ^"accept: application/json, text/javascript, */*; q=0.01^" ^
  -H ^"accept-language: zh-CN,zh;q=0.9^" ^
  -H ^"cbg-request-id: 019BC0EB-F720-7BEB-8338-E89812672532^" ^
  -H ^"cbg-safe-code: ltvkhtwr^" ^
  -b ^"NTES_PASSPORT=; last_login_serverid=; last_login_roleid=; serverid_share_login_token_h5=; login_id=bbaee505-f1ea-11f0-a7f0-840f315fd8d4; _flow_group_v2=g67; fingerprint=7wRIGHFEYAWhHAukgzRX53iO; NTES_CMT_USER_INFO=1221329938^%^7C^%^E6^%^9C^%^89^%^E6^%^80^%^81^%^E5^%^BA^%^A6^%^E7^%^BD^%^91^%^E5^%^8F^%^8B18P0gi^%^7Chttp^%^3A^%^2F^%^2Fcms-bucket.nosdn.127.net^%^2F2018^%^2F08^%^2F13^%^2F078ea9f65d954410b62a52ac773875a1.jpeg^%^7Cfalse^%^7CZmVpbnZseWQwM0AxNjMuY29t; timing_user_id=time_a0V4fxNgAM; trace_session_id=019B8701-C6B5-8B00-04E8-586EE96A68F8; _external_mark=cbgcb; reco_sid=LzWITK5-Hx6fvuyOMSMVMSuZWQ00w0eKaw9vhp1D; urs_share_login_token=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; urs_share_login_token_h5=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; last_login_serverid=94; last_login_roleid=30067162; serverid_share_login_token_h5=94^$e779889e76aa32e34fa439194608aeba; NTES_P_UTID=osVT0pNm8OffO7UVfZ8KijENqxkxr7Tm^|1768440457; NTES_PASSPORT=B5q.L_lugtJbOEXiE5r.MMEXcXDmCwjIQbqYrVYPQJDNaTjyysCcbgIpiAHOdrF3UhXgQKaRdOfNqr0l.g_sviW_f4jggL4ilHxWKAu2Wam4dgZl_6XIiugb78qJhwI3F9TntsjzNYxee3vzXzbWbpqVh7p2t78vwNKcKDa5r7x3eILuvnGpcO352Xv_8gAy0; S_INFO=1768440457^|0^|2^&70^#^#^|m15168766725; P_INFO=m15168766725^@163.com^|1768440457^|1^|cbg^|00^&99^|zhj^&1768393067^&xyq^#zhj^&330400^#10^#0^#0^|^&0^|cbg^&xyq_qrcode^|m15168766725^@163.com; NTES_SESS=cxxiFRtxNRJOR6GpSN96fEA.zCFkBq_eyUwjj36hJrIQCue88ES.FfnYkro3VdcQboCSyEAmxWNimixHpWVXHHOJlC1r4i7ufcXGzCGnweR8D4_NxdIdcSVml6WYn6g0NOBGKAqbGg.e7Mm5azvio3LZw.lBG2x9xeG1P6JzsPGJQ3BiXw27liPWFciBUSJcTiwomg8DdYxfv; sid=v2.s.geQP31DwyX1SBxonAD0QhXVDKj-kBiZosgodaA0-l39Xz-4Z; is_log_active_stat=1; transmit_info=^%^7B^%^22time^%^22^%^3A1768467675333^%^2C^%^22bs^%^22^%^3A^%^7B^%^22ticket_id^%^22^%^3A^%^2200_30628_1768467675333^%^22^%^2C^%^22bd_id^%^22^%^3A^%^7B^%^7D^%^7D^%^7D^" ^
  -H ^"priority: u=1, i^" ^
  -H ^"referer: https://xyq-m.cbg.163.com/cgi/mweb/pl?cross_buy_serverid=94^&search_type=overall_equip_search^&kindid=18^&tfid=f_equip_list^&tcid=c_all_list^&special_mode=and^&special_skill=2019,2018,2017,2015,1034,1032,1030,1027,1024,1022,1018,1015^&init_defense=230^&sum_attr_type=endurance,physique,dex^&sum_attr_value=35^&repair_fail=1^&refer_sn=019BC0E4-5711-4915-22BA-E03061DA7A81^" ^
  -H ^"sec-ch-ua: ^\^"Google Chrome^\^";v=^\^"143^\^", ^\^"Chromium^\^";v=^\^"143^\^", ^\^"Not A(Brand^\^";v=^\^"24^\^"^" ^
  -H ^"sec-ch-ua-mobile: ?0^" ^
  -H ^"sec-ch-ua-platform: ^\^"Windows^\^"^" ^
  -H ^"sec-fetch-dest: empty^" ^
  -H ^"sec-fetch-mode: cors^" ^
  -H ^"sec-fetch-site: same-origin^" ^
  -H ^"user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36^" ^
  -H ^"x-requested-with: XMLHttpRequest^"
`

// 230初防的女特技衣服
let request4 = `
curl 'https://xyq-m.cbg.163.com/cgi-bin/recommend.py?client_type=h5&act=recommd_by_role' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'cbg-request-id: 019BC0EE-0B5C-EEE1-BFBF-262F05A7CAD4' \
  -H 'cbg-safe-code: ltvkhtwr' \
  -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
  -b 'login_id=ae521d7d-f1e8-11f0-8211-47edd1e880d4; _flow_group_v2=g67; fingerprint=7wRIGHFEYAWhHAukgzRX53iO; NTES_CMT_USER_INFO=1221329938%7C%E6%9C%89%E6%80%81%E5%BA%A6%E7%BD%91%E5%8F%8B18P0gi%7Chttp%3A%2F%2Fcms-bucket.nosdn.127.net%2F2018%2F08%2F13%2F078ea9f65d954410b62a52ac773875a1.jpeg%7Cfalse%7CZmVpbnZseWQwM0AxNjMuY29t; timing_user_id=time_a0V4fxNgAM; trace_session_id=019B8701-C6B5-8B00-04E8-586EE96A68F8; _external_mark=cbgcb; reco_sid=LzWITK5-Hx6fvuyOMSMVMSuZWQ00w0eKaw9vhp1D; urs_share_login_token=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; urs_share_login_token_h5=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; last_login_serverid=94; last_login_roleid=30067162; serverid_share_login_token_h5=94$e779889e76aa32e34fa439194608aeba; NTES_P_UTID=osVT0pNm8OffO7UVfZ8KijENqxkxr7Tm|1768440457; NTES_PASSPORT=B5q.L_lugtJbOEXiE5r.MMEXcXDmCwjIQbqYrVYPQJDNaTjyysCcbgIpiAHOdrF3UhXgQKaRdOfNqr0l.g_sviW_f4jggL4ilHxWKAu2Wam4dgZl_6XIiugb78qJhwI3F9TntsjzNYxee3vzXzbWbpqVh7p2t78vwNKcKDa5r7x3eILuvnGpcO352Xv_8gAy0; S_INFO=1768440457|0|2&70##|m15168766725; P_INFO=m15168766725@163.com|1768440457|1|cbg|00&99|zhj&1768393067&xyq#zhj&330400#10#0#0|&0|cbg&xyq_qrcode|m15168766725@163.com; NTES_SESS=cxxiFRtxNRJOR6GpSN96fEA.zCFkBq_eyUwjj36hJrIQCue88ES.FfnYkro3VdcQboCSyEAmxWNimixHpWVXHHOJlC1r4i7ufcXGzCGnweR8D4_NxdIdcSVml6WYn6g0NOBGKAqbGg.e7Mm5azvio3LZw.lBG2x9xeG1P6JzsPGJQ3BiXw27liPWFciBUSJcTiwomg8DdYxfv; sid=v2.s.geQP31DwyX1SBxonAD0QhXVDKj-kBiZosgodaA0-l39Xz-4Z; is_log_active_stat=1; transmit_info=%7B%22time%22%3A1768467675333%2C%22bs%22%3A%7B%22ticket_id%22%3A%2200_30628_1768467675333%22%2C%22bd_id%22%3A%7B%7D%7D%7D' \
  -H 'origin: https://xyq-m.cbg.163.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://xyq-m.cbg.163.com/cgi/mweb/pl?cross_buy_serverid=94&search_type=overall_equip_search&kindid=59&tfid=f_equip_list&tcid=c_all_list&special_mode=and&special_skill=2019,2018,2017,2015,1034,1032,1030,1027,1024,1022,1018,1015&init_defense=230&sum_attr_type=endurance,physique,dex&sum_attr_value=35&repair_fail=1&price_max=10000000&level_min=130&level_max=160&refer_sn=019BC0ED-F943-1911-C9FA-9C4969D2FB04' \
  -H 'sec-ch-ua: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36' \
  -H 'x-requested-with: XMLHttpRequest' \
  --data-raw 'count=15&view_loc=search_cond%7Ctag_key%3A%7B%7D&cross_buy_serverid=94&search_type=overall_equip_search&kindid=59&tfid=f_equip_list&tcid=c_all_list&special_mode=and&special_skill=2019%2C2018%2C2017%2C2015%2C1034%2C1032%2C1030%2C1027%2C1024%2C1022%2C1018%2C1015&init_defense=230&sum_attr_type=endurance%2Cphysique%2Cdex&sum_attr_value=35&repair_fail=1&price_max=10000000&level_min=130&level_max=160&refer_sn=019BC0ED-F943-1911-C9FA-9C4969D2FB04&order_by=&page=1&exter=cbgcb&page_session_id=019BC0E3-4C2B-CCE4-00DD-FF4E47867E48&traffic_trace=%7B%22field_id%22%3A%22f_equip_list%22%2C%22content_id%22%3A%22c_all_list%22%7D&exposed_scene_id=1768468384604-eca05bf0'
`

let mockRequest = `
fetch("https://xyq-m.cbg.163.com/cgi-bin/recommend.py?client_type=h5&act=recommd_by_role", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "cbg-request-id": "019BC4CF-6B44-C1BF-1DF3-256E44F3B1C6",
    "cbg-safe-code": "lfRxVmPJ",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "login_id=87cbefd1-f278-11f0-86e5-ea7143cd2bf7; _flow_group_v2=g67; fingerprint=7wRIGHFEYAWhHAukgzRX53iO; NTES_CMT_USER_INFO=1221329938%7C%E6%9C%89%E6%80%81%E5%BA%A6%E7%BD%91%E5%8F%8B18P0gi%7Chttp%3A%2F%2Fcms-bucket.nosdn.127.net%2F2018%2F08%2F13%2F078ea9f65d954410b62a52ac773875a1.jpeg%7Cfalse%7CZmVpbnZseWQwM0AxNjMuY29t; timing_user_id=time_a0V4fxNgAM; last_login_serverid=94; last_login_roleid=30067162; serverid_share_login_token_h5=94$e779889e76aa32e34fa439194608aeba; NTES_P_UTID=osVT0pNm8OffO7UVfZ8KijENqxkxr7Tm|1768440457; NTES_PASSPORT=B5q.L_lugtJbOEXiE5r.MMEXcXDmCwjIQbqYrVYPQJDNaTjyysCcbgIpiAHOdrF3UhXgQKaRdOfNqr0l.g_sviW_f4jggL4ilHxWKAu2Wam4dgZl_6XIiugb78qJhwI3F9TntsjzNYxee3vzXzbWbpqVh7p2t78vwNKcKDa5r7x3eILuvnGpcO352Xv_8gAy0; P_INFO=m15168766725@163.com|1768440457|1|cbg|00&99|zhj&1768393067&xyq#zhj&330400#10#0#0|&0|cbg&xyq_qrcode|m15168766725@163.com; trace_session_id=019BC460-F344-344C-A63F-CE59A85C236E; urs_share_login_token=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; urs_share_login_token_h5=bTE1MTY4NzY2NzI1QDE2My5jb20kYzkxZDdkOTMzMTBkYmI3OGFiYWQ3YjJhOGI4OTJlZTM=; reco_sid=LzWITK5-Hx6fvuyOMSMVMSuZWQ00w0eKaw9vhp1D; NTES_SESS=yqtVYUmu3htmulTOKFG8FDvheSRZE4BmyTHUUAFSt1lrBhbjjfx80JaMO1DAkiyruDBxXf2Q7zpZQZ7N4zkWNN5t6BE1dZRhJyWPnBPaHbejYdCp7iliyxkQ6FzMaFKGpq8wKRan2w7SJXALUuo3dTlV.EMDPN.RDcfDppH0Kuo3LvLdkXFlBrRE7LjrSKUskZHDQKjYiM7J9; sid=v2.s.0YCsYfJe7mHkAHWkVi8DJscWvkeXboHgAneUocPpg6moHj1G; _external_mark=192.168.0.106%3A4610; transmit_info=%7B%22time%22%3A1768529973700%2C%22bs%22%3A%7B%22ticket_id%22%3A%2200_30628_1768529973700%22%2C%22bd_id%22%3A%7B%7D%7D%7D; is_log_active_stat=1",
    "Referer": "https://xyq-m.cbg.163.com/cgi/mweb/pl?view_loc=all_list&cross_buy_serverid=94&search_type=overall_equip_search&kindid=18&kind_name=%E9%93%A0%E7%94%B2&tfid=f_equip_list&tcid=c_all_list&refer_sn=019BC4B4-1CA9-1ABB-3F49-3E44B09D7297&order_by=selling_time%20DESC"
  },
  "body": "count=15&view_loc=all_list&cross_buy_serverid=94&search_type=overall_equip_search&kindid=18&tfid=f_equip_list&tcid=c_all_list&refer_sn=019BC4B4-1CA9-1ABB-3F49-3E44B09D7297&order_by=selling_time+DESC&page=1&exter=192.168.0.106%3A4610&page_session_id=019BC4B4-2182-442C-42B5-8FA1D7679E5B&traffic_trace=%7B%22field_id%22%3A%22f_equip_list%22%2C%22content_id%22%3A%22c_all_list%22%7D&exposed_scene_id=1768533486403-26ef1b49",
  "method": "POST"
});
`


export { requestBase, request1, request2, request3, request4, mockRequest };