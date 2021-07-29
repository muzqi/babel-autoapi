const resolveCharacters = (str) => str.replace(/\|/g, '/');

/**
 * 处理描述信息
 */
const resolveDescription = (descriptions) => {
  if (!descriptions || !descriptions.length) return '';

  let md = '\n';
  descriptions.map((d, i) => {
    if (descriptions.length > 1) {
      if (i === 0) {
        md += `描述：\n\n${d}\n\n`;
      } else {
        md += d;
      }
    } else {
      md += `描述：${d}`
    }
  });

  return md;
}

const resolveTableDescription = (descriptions) => {
  if (!descriptions || !descriptions.length) return '';

  let md = '';
  descriptions.map(d => md += `${resolveCharacters(d)}<br/>`);
  return md;
}

/**
 * 处理参数信息
 */
const resolveParameters = (tags, level = '###', title = '参数') => {
  if (!tags || !tags.length) return '';

  const parameters = tags.filter(n => n.title === 'param');

  if (!parameters.length) return '';

  let md = `\n\n${level} ${title}\n\n|属性|类型|是否必填|是否只读|描述|\n|---|---|---|---|---|\n`;

  // 处理参数描述
  parameters.map(d => {
    md += `|\`${d.name}\`|${d.type ? resolveCharacters(d.type) : '未知'}|${typeof d.optional === 'boolean' ? !d.optional : '未知'}|${typeof d.readonly === 'boolean' ? d.readonly : '未知'}|${resolveTableDescription(d.description)}|\n`
  });

  return md;
}

/**
 * 处理基础数据，如 author
 */
const resolveBaseInfo = (tags) => {
  if (!tags || !tags.length) return '';

  let md = '';
  const typeMap = ['author', 'license', 'todo', 'version', 'since', 'copyright'];
  tags.filter(n => typeMap.includes(n.title)).map(d => {
    if (!d.description || !d.description.length) return;
    d.description.map(_d => md += `> @${d.title}: ${_d}<br/>\n`);
  });

  return md;
}

/**
 * 生成函数的形状
 */
const resolveFunctionInterface = (name, tags) => {
  let md = '';
  let parameters = '';
  let returns = '';

  if (tags && tags.length) {
    parameters = tags.filter(n => n.title === 'param').map(d => {
      return `*${d.name}${typeof d.optional === 'boolean' ? d.optional ? '?' : '' : ''}*: \`${d.type}\``;
    }).join(', ');

    const _returns = tags.filter(n => n.title === 'return' || n.title === 'returns');
    if (_returns.length) {
      returns = `\`${_returns[0].type}\``;
    } else {
      returns = '`void`';
    }
  }

  md = `\n语法：**${name}**(${parameters}): ${returns}\n`;

  return md;
}

/**
 * 处理函数方法
 */
const resolveFunction = (data, level = '##', type = 'Function') => {
  let md = '';
  md += `\n${level} ${type} ${data.name}\n\n`;

  if (data.docs && data.docs.length) {
    md += resolveBaseInfo(data.docs[0].tags);                       // 处理基本信息，如 author
    md += resolveFunctionInterface(data.name, data.docs[0].tags);   // 处理函数形状

    data.docs.map(d => {
      md += resolveDescription(d.description);                      // 接口描述
      md += resolveParameters(d.tags, `${level}#`);                 // 参数描述
    });

    if (data.docs[0].tags && data.docs[0].tags.length) {
      // 处理 return 信息
      const returns = data.docs[0].tags.filter(n => n.title === 'return' || n.title === 'returns');
      if (returns.length) {
        md += `\n\n${level}# 响应`;
        returns.map(d => {
          md += `\n\n|描述|类型|\n`;
          md += `|---|---|\n`;
          md += `|${resolveTableDescription(d.description)}|${resolveCharacters(d.type)}|\n`
        });
      }

      // 处理 example
      const examples = data.docs[0].tags.filter(n => n.title === 'example');
      if (examples.length) {
        md += `\n\n${level}# 示例`;
        examples.map(d => {
          md +=
`
\`\`\`javascript
${d.description}
\`\`\`
`
        });
      }
    }
  }

  md += `\n<br>\n`;

  return md;
}

/**
 * 处理类
 */
const resolveClass = (data) => {
  let md = '';
  md += `\n\n## Class ${data.name}\n\n`;

  if (data.constructorInfo && data.constructorInfo.length) {
    md += resolveBaseInfo(data.constructorInfo[0].tags);  // 处理基本信息，如 author

    data.constructorInfo.map(d => {
      md += resolveDescription(d.description);            // 接口描述
      md += resolveParameters(d.tags, '', '');            // 参数描述
    });

    // 处理 example
    const examples = data.constructorInfo[0].tags.filter(n => n.title === 'example');
    if (examples.length) {
     examples.map(d => {
        md +=
`
\`\`\`javascript
${d.description}
\`\`\`
`
     });
    }
  }

  if (data.propertiesInfo && data.propertiesInfo.length) {
    md += resolveParameters(data.propertiesInfo, '###', '实例属性');
  }

  if (data.methodsInfo && data.methodsInfo.length) {
    md += `\n\n### 类方法\n\n`;
    data.methodsInfo.map(d => md += resolveFunction(d, '####'));
  }

  return md;
}

/**
 * 处理 TS interface
 */
const resolveTsInterface = (data) => {
  let md = '';

  switch (data.type) {
    case 'ts-interface':
      md += `\n\n## Interface ${data.name}\n\n`;

      if (data.leadingComment) {
        md += resolveBaseInfo(data.leadingComment.tags);           // 处理基本信息，如 author
        md += resolveDescription(data.leadingComment.description); // 接口描述
      }

      if (data.tags && data.tags.length) {
        md += resolveParameters(data.tags);
      }

      md += `\n<br/>\n`;
      break;
    case 'ts-interface-function':
      md += resolveFunction(data, '##', 'Interface');
      break;
    default:
      break;
  }

  return md;
}

const resolveTsType = (data) => {
  let md = '';

  switch (data.type) {
    case 'ts-type':
      md += `\n\n## Type ${data.name}\n\n`;
      md += resolveBaseInfo(data.doc.tags);
      md += resolveDescription(data.doc.description);
      md += `\n\n类型：${data.doc.type}\n\n`;
      md += `\n<br/>\n`;
      break;
    case 'ts-type-function':
      md += resolveFunction(data, '##', 'Type Function');
      break;
    default:
      break;
  }

  return md;
}

module.exports = (docs, toc) => {
  let md = '';

  if (toc) {
    md += `\n\n[TOC]\n\n`;
  }

  const resolver = (doc) => {
    md += `\n# ${doc.filename}\n`;

    doc.dataSource.map(d => {
      switch (d.type) {
        case 'function':
        case 'arrow-function':
          md += resolveFunction(d);
          break;
        case 'class':
          md += resolveClass(d);
          break;
        case 'ts-interface':
        case 'ts-interface-function':
          md += resolveTsInterface(d);
          break;
        case 'ts-type':
        case 'ts-type-function':
          md += resolveTsType(d);
          break;
        default:
          break;
      }
    });
  }

  if (Object.prototype.toString.call(docs) === '[object Array]') {
    docs.map(doc => resolver(doc));
  } else {
    resolver(docs);
  }

  return md;
}
